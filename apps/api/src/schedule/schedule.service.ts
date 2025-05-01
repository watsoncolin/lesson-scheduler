import { Injectable } from '@nestjs/common'
import { Model, Types } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { ScheduleEntity } from './entities/schedule.entity'
import { Schedule } from './schedule'
import { CreateScheduleDto } from './dto/create-schedule.dto'
import { UpdateScheduleDto } from './dto/update-schedule.dto'
import { LessonTypesEnum } from 'shared/lesson-types.enum'
import { fromZonedTime, toZonedTime } from 'date-fns-tz'
import { addDays } from 'date-fns'

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
export class ScheduleService {
  constructor(
    @InjectModel(ScheduleEntity.name)
    private readonly model: Model<ScheduleEntity>,
  ) {}
  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    const _id = new Types.ObjectId()

    const startDateTime = new Date(createScheduleDto.startDateTime)
    const endDateTime = new Date(createScheduleDto.endDateTime)

    const result = await this.model.create({
      _id,
      poolId: new Types.ObjectId(createScheduleDto.poolId),
      instructorId: new Types.ObjectId(createScheduleDto.instructorId),
      classSize: createScheduleDto.classSize,
      lessonType: createScheduleDto.lessonType,
      startDateTime,
      endDateTime,
    })
    const entity = await this.model.findById(result._id)
    if (!entity) {
      throw new Error('Schedule not found')
    }
    return mapper(entity)
  }

  async findAll(scheduleIds?: string[]): Promise<Schedule[]> {
    const filter: any = {}
    if (scheduleIds) {
      filter['_id'] = { $in: scheduleIds.map(id => new Types.ObjectId(id)) }
    }
    const entities = await this.model.find(filter)
    return entities.map(mapper)
  }

  async findAllByUserId(userId: string): Promise<Schedule[]> {
    return (
      await this.model.find({
        'registrations.userId': new Types.ObjectId(userId),
      })
    ).map(mapper)
  }

  async search(
    poolIds?: string[],
    instructorIds?: string[],
    daysOfWeek?: number[],
    date?: string,
    timezone?: string,
  ): Promise<Schedule[]> {
    const filter: {
      $and?: any[]
      $or: any[]
    } = {
      $or: [],
    }
    if (poolIds) {
      filter.$or.push({ poolId: { $in: poolIds.map(id => new Types.ObjectId(id)) } })
    }
    if (instructorIds) {
      filter.$or.push({ instructorId: { $in: instructorIds.map(id => new Types.ObjectId(id)) } })
    }
    if (daysOfWeek) {
      filter.$and = [
        {
          $or: daysOfWeek.map(dayOfWeek => ({ $expr: { $eq: [{ $dayOfWeek: '$startDateTime' }, dayOfWeek] } })),
        },
      ]
    }
    if (date) {
      filter.$and = filter.$and || []
      // Parse the date string

      if (timezone) {
        // Convert local dates to UTC for database query
        const startOfDayOffset = fromZonedTime(date, timezone)
        const endOfDayOffset = addDays(startOfDayOffset, 1)

        console.log('date', date)
        console.log('startOfDayOffset', startOfDayOffset)
        console.log('endOfDayOffset', endOfDayOffset)
        console.log('timezone', timezone)

        filter.$and.push({
          startDateTime: {
            $gte: startOfDayOffset,
            $lt: endOfDayOffset,
          },
        })
      } else {
        // If no timezone provided, use UTC dates
        const [year, month, day] = date.split('-').map(Number)
        const startOfDay = new Date(Date.UTC(year, month - 1, day, 0, 0, 0))
        const endOfDay = new Date(Date.UTC(year, month - 1, day, 23, 59, 59))

        filter.$and.push({
          startDateTime: {
            $gte: startOfDay,
            $lt: endOfDay,
          },
        })
      }
    }

    const entities = await this.model.find(filter).sort({ startDateTime: 1 })
    const results = entities.map(mapper)
    return results.filter(schedule => schedule.registrations.length < schedule.classSize)
  }

  async findOne(id: string): Promise<Schedule> {
    const entity = await this.model.findById(new Types.ObjectId(id))
    if (!entity) {
      throw new Error('Schedule not found')
    }
    return mapper(entity)
  }

  async update(updateScheduleDto: UpdateScheduleDto): Promise<Schedule> {
    const updates: any = {}

    if (updateScheduleDto.poolId) {
      updates['poolId'] = new Types.ObjectId(updateScheduleDto.poolId)
    }

    if (updateScheduleDto.instructorId) {
      updates['instructorId'] = new Types.ObjectId(updateScheduleDto.instructorId)
    }

    if (updateScheduleDto.classSize) {
      updates['classSize'] = updateScheduleDto.classSize
    }

    if (updateScheduleDto.lessonType) {
      updates['lessonType'] = updateScheduleDto.lessonType
    }

    if (updateScheduleDto.startDateTime) {
      updates['startDateTime'] = updateScheduleDto.startDateTime
    }

    if (updateScheduleDto.endDateTime) {
      updates['endDateTime'] = updateScheduleDto.endDateTime
    }

    await this.model.updateOne(
      { _id: new Types.ObjectId(updateScheduleDto.id) },
      {
        $set: {
          ...updates,
        },
      },
    )
    const entity = await this.model.findById(new Types.ObjectId(updateScheduleDto.id))
    if (!entity) {
      throw new Error('Product not found')
    }
    return mapper(entity)
  }

  async remove(id: string): Promise<void> {
    await this.model.deleteOne({ _id: new Types.ObjectId(id) })
  }

  async findAllParentTot() {
    const result = await this.model.find({
      lessonType: LessonTypesEnum.GROUP,
    })

    return result.map(mapper)
  }
}
