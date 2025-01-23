import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { ObjectId } from 'mongodb'
import { ScheduleEntity } from './entities/schedule.entity'
import { Schedule } from './schedule'
import { CreateScheduleDto } from './dto/create-schedule.dto'
import { UpdateScheduleDto } from './dto/update-schedule.dto'
import { CreateRegistrationDto } from './dto/create-registration.dto'
import { Registration } from './registration'
import { TransactionService } from 'payment/transaction.service'
import { LessonTypesEnum } from 'shared/lesson-types.enum'
import { CreditTypesEnum } from 'shared/credit-types.enum'
import { TransactionTypesEnum } from 'shared/transaction-types.enum'

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
  ) {}
  async create(scheduleId: string, createRegistrationDto: CreateRegistrationDto): Promise<Schedule> {
    // Find schedule
    const schedule = await this.model.findById(new ObjectId(scheduleId))
    if (!schedule) {
      throw new NotFoundException('Schedule not found')
    }

    if (schedule.classSize <= schedule.registrations.length) {
      throw new BadRequestException('Class is full')
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

    // Create registration transaction
    const transaction = await this.transactionService.create({
      userId: createRegistrationDto.userId,
      productId: schedule.poolId,
      credits: -1,
      creditType: schedule.lessonType == LessonTypesEnum.PRIVATE ? CreditTypesEnum.PRIVATE : CreditTypesEnum.GROUP,
      transactionType: TransactionTypesEnum.Register,
    })

    // Push registration on model
    await this.model.updateOne(
      { _id: new ObjectId(scheduleId) },
      {
        $push: {
          registrations: {
            userId: new ObjectId(createRegistrationDto.userId),
            studentId: new ObjectId(createRegistrationDto.studentId),
            createdAt: new Date(),
            transactionId: transaction.id,
          },
        },
      },
    )

    const entity = await this.model.findById(schedule._id)
    if (!entity) {
      throw new NotFoundException('Schedule not found')
    }
    return mapper(entity)
  }

  async findAll(scheduleId: string): Promise<Registration[]> {
    const schedule = await this.model.findById(new ObjectId(scheduleId))
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

  async remove(scheduleId: string, studentId: string): Promise<void> {
    const schedule = await this.model.findById(new ObjectId(scheduleId))
    if (!schedule) {
      throw new NotFoundException('Schedule not found')
    }

    const registrationIndex = schedule.registrations.findIndex(
      registration => registration.studentId.toString() === studentId,
    )
    if (registrationIndex === -1) {
      throw new NotFoundException('Registration not found')
    }

    const userId = schedule.registrations[registrationIndex].userId.toString()

    schedule.registrations.splice(registrationIndex, 1)

    await this.model.updateOne(
      { _id: new ObjectId(scheduleId) },
      {
        $set: {
          registrations: schedule.registrations,
        },
      },
    )

    // Create the counter transaction
    await this.transactionService.create({
      userId,
      productId: schedule.poolId,
      credits: 1,
      creditType: schedule.lessonType == LessonTypesEnum.PRIVATE ? CreditTypesEnum.PRIVATE : CreditTypesEnum.GROUP,
      transactionType: TransactionTypesEnum.CancelRegistration,
    })
  }
}
