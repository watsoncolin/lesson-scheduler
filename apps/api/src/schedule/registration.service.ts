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
  ) {}
  async create(
    scheduleId: string,
    transactionId: string,
    createRegistrationDto: CreateRegistrationDto,
  ): Promise<Schedule> {
    // Find schedule
    const schedule = await this.model.findById(new ObjectId(scheduleId))
    if (!schedule) {
      throw new NotFoundException('Schedule not found')
    }

    if (schedule.classSize <= schedule.registrations.length) {
      throw new BadRequestException('Class is full')
    }

    // Push registration on model
    await this.model.updateOne(
      { _id: new ObjectId(scheduleId) },
      {
        $push: {
          registrations: {
            userId: new ObjectId(createRegistrationDto.userId),
            studentId: new ObjectId(createRegistrationDto.studentId),
            createdAt: new Date(),
            transactionId: new ObjectId(),
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

    schedule.registrations.splice(registrationIndex, 1)

    await this.model.updateOne(
      { _id: new ObjectId(scheduleId) },
      {
        $set: {
          registrations: schedule.registrations,
        },
      },
    )
  }
}
