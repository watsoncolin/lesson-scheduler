import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { Model, Types } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { ScheduleEntity } from './entities/schedule.entity'
import { Schedule } from './schedule'
import { CreateRegistrationDto } from './dto/create-registration.dto'
import { Registration } from './registration'
import { TransactionService } from 'payment/transaction.service'
import { LessonTypesEnum } from 'shared/lesson-types.enum'
import { CreditTypesEnum } from 'shared/credit-types.enum'
import { TransactionTypesEnum } from 'shared/transaction-types.enum'
import { UserService } from 'user/user.service'
import { RegistrationCanceledEvent } from './events/registration-canceled.event'
import { EventBus } from '@nestjs/cqrs'
import { differenceInHours } from 'date-fns'
import { StudentService } from 'student/student.service'
import { RegistrationCreatedEvent } from './events/registration-created.event'

const mapper = (entity: ScheduleEntity): Schedule => {
  return {
    id: entity._id.toString(),
    poolId: entity.poolId.toString(),
    instructorId: entity.instructorId.toString(),
    classSize: entity.classSize,
    lessonType: entity.lessonType,
    startDateTime: entity.startDateTime,
    endDateTime: entity.endDateTime,
    registrations: entity.registrations.map(registration => ({
      userId: registration.userId.toString(),
      studentId: registration.studentId.toString(),
      createdAt: registration.createdAt,
      transactionId: registration.transactionId.toString(),
    })),
  }
}

@Injectable()
export class RegistrationService {
  constructor(
    @InjectModel(ScheduleEntity.name)
    private readonly model: Model<ScheduleEntity>,
    private readonly transactionService: TransactionService,
    private readonly userService: UserService,
    private readonly eventBus: EventBus,
    private readonly studentService: StudentService,
  ) {}

  async create(scheduleId: string, createRegistrationDto: CreateRegistrationDto): Promise<Schedule> {
    const user = await this.userService.findOne(createRegistrationDto.userId)
    if (!user) {
      throw new NotFoundException('User not found')
    }

    if (!user.signedWaiver) {
      throw new BadRequestException('User has not signed waiver')
    }
    // Find schedule
    const schedule = await this.model.findById(new Types.ObjectId(scheduleId))
    if (!schedule) {
      throw new NotFoundException('Schedule not found')
    }

    const student = await this.studentService.findOne(createRegistrationDto.studentId)
    if (!student || student.userId.toString() !== createRegistrationDto.userId) {
      throw new NotFoundException('Student not found')
    }

    const creditBalances = await this.transactionService.readCreditBalances(createRegistrationDto.userId)
    const creditBalance = creditBalances.find(creditBalance =>
      schedule.lessonType == LessonTypesEnum.PRIVATE
        ? creditBalance.creditType == 'private'
        : creditBalance.creditType == 'group',
    )

    if (!creditBalance || creditBalance.balance <= 0) {
      throw new BadRequestException('Not enough credits')
    }

    // Prepare registration object (transactionId will be set after transaction creation)
    let transaction
    let registration
    try {
      // Atomically push registration if class is not full
      registration = {
        userId: new Types.ObjectId(createRegistrationDto.userId),
        studentId: new Types.ObjectId(createRegistrationDto.studentId),
        createdAt: new Date(),
        transactionId: undefined, // placeholder
      }

      // Atomically check and push registration
      const updated = await this.model.findOneAndUpdate(
        {
          _id: new Types.ObjectId(scheduleId),
          $expr: { $lt: [{ $size: '$registrations' }, '$classSize'] },
        },
        { $push: { registrations: registration } },
        { new: true },
      )

      if (!updated) {
        throw new BadRequestException('Class is full')
      }

      // Now create the transaction
      transaction = await this.transactionService.create({
        userId: createRegistrationDto.userId,
        credits: -1,
        creditType: schedule.lessonType == LessonTypesEnum.PRIVATE ? CreditTypesEnum.PRIVATE : CreditTypesEnum.GROUP,
        transactionType: TransactionTypesEnum.Register,
        scheduleId,
        studentId: createRegistrationDto.studentId,
      })

      // Update the registration with the transactionId
      await this.model.updateOne(
        {
          _id: new Types.ObjectId(scheduleId),
          'registrations.userId': new Types.ObjectId(createRegistrationDto.userId),
          'registrations.studentId': new Types.ObjectId(createRegistrationDto.studentId),
        },
        {
          $set: {
            'registrations.$.transactionId': transaction.id,
          },
        },
      )
    } catch (err) {
      // Optionally: rollback if transaction was created but registration failed, or vice versa
      throw err
    }

    const entity = await this.model.findById(schedule._id)
    if (!entity) {
      throw new NotFoundException('Schedule not found')
    }
    this.eventBus.publish(new RegistrationCreatedEvent(createRegistrationDto.userId, scheduleId, student.id))
    return mapper(entity)
  }

  async findAll(scheduleId: string): Promise<Registration[]> {
    const schedule = await this.model.findById(new Types.ObjectId(scheduleId))
    if (!schedule) {
      throw new NotFoundException('Schedule not found')
    }
    return schedule.registrations.map(registration => ({
      userId: registration.userId.toString(),
      studentId: registration.studentId.toString(),
      createdAt: registration.createdAt,
      transactionId: registration.transactionId.toString(),
    }))
  }

  async remove(scheduleId: string, studentId: string, allowWithin24Hours = false): Promise<void> {
    const schedule = await this.model.findById(new Types.ObjectId(scheduleId))
    if (!schedule) {
      throw new NotFoundException('Schedule not found')
    }

    const registrationIndex = schedule.registrations.findIndex(
      registration => registration.studentId.toString() === studentId,
    )
    if (registrationIndex === -1) {
      throw new NotFoundException('Registration not found')
    }

    // If the registration is within 24 hours, do not cancel
    const startDateTime = new Date(schedule.startDateTime)
    const now = new Date()
    const diffInHours = differenceInHours(startDateTime, now)
    if (!allowWithin24Hours && diffInHours < 24) {
      throw new BadRequestException('Registration is within 24 hours')
    }
    const userId = schedule.registrations[registrationIndex].userId.toString()

    schedule.registrations.splice(registrationIndex, 1)

    await this.model.updateOne(
      { _id: new Types.ObjectId(scheduleId) },
      {
        $set: {
          registrations: schedule.registrations,
        },
      },
    )

    // Create the counter transaction
    await this.transactionService.create({
      userId,
      credits: 1,
      creditType: schedule.lessonType == LessonTypesEnum.PRIVATE ? CreditTypesEnum.PRIVATE : CreditTypesEnum.GROUP,
      transactionType: TransactionTypesEnum.CancelRegistration,
      scheduleId,
      studentId,
    })

    this.eventBus.publish(new RegistrationCanceledEvent(userId, scheduleId, studentId))
  }
}
