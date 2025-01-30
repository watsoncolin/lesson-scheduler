import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { ObjectId } from 'mongodb'
import { ScheduleEntity } from './entities/schedule.entity'
import { Schedule } from './schedule'
import { CreateScheduleDto } from './dto/create-schedule.dto'
import { UpdateScheduleDto } from './dto/update-schedule.dto'
import { LessonTypesEnum } from 'shared/lesson-types.enum'

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
    const _id = new ObjectId()
    const result = await this.model.create({
      _id,
      poolId: new ObjectId(createScheduleDto.poolId),
      instructorId: new ObjectId(createScheduleDto.instructorId),
      classSize: createScheduleDto.classSize,
      lessonType: createScheduleDto.lessonType,
      startDateTime: createScheduleDto.startDateTime,
      endDateTime: createScheduleDto.endDateTime,
    })
    const entity = await this.model.findById(result._id)
    if (!entity) {
      throw new Error('Schedule not found')
    }
    return mapper(entity)
  }

  async findAll(scheduleIds?: string[]): Promise<Schedule[]> {
    const filter = {}
    if (scheduleIds) {
      filter['_id'] = { $in: scheduleIds.map(id => new ObjectId(id)) }
    }
    const entities = await this.model.find(filter)
    return entities.map(mapper)
  }

  async findAllByUserId(userId: string): Promise<Schedule[]> {
    return (
      await this.model.find({
        'registrations.userId': new ObjectId(userId),
      })
    ).map(mapper)
  }

  async search(
    poolIds?: string[],
    instructorIds?: string[],
    daysOfWeek?: number[],
    date?: string,
  ): Promise<Schedule[]> {
    const filter: {
      startDateTime: any
      $and?: any[]
      $or: any[]
    } = {
      startDateTime: { $gte: new Date() },
      $or: [],
    }
    if (poolIds) {
      filter.$or.push({ poolId: { $in: poolIds.map(id => new ObjectId(id)) } })
    }
    if (instructorIds) {
      filter.$or.push({ instructorId: { $in: instructorIds.map(id => new ObjectId(id)) } })
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
      filter.$and.push({
        $expr: {
          $eq: [
            {
              $dateToString: {
                format: '%Y-%m-%d',
                date: '$startDateTime',
              },
            },
            date,
          ],
        },
      })
    }

    const entities = await this.model.find(filter)

    const results = entities.map(mapper)

    return results.filter(schedule => schedule.registrations.length < schedule.classSize)
  }

  async findOne(id: string): Promise<Schedule> {
    const entity = await this.model.findById(new ObjectId(id))
    if (!entity) {
      throw new Error('Schedule not found')
    }
    return mapper(entity)
  }

  async update(updateScheduleDto: UpdateScheduleDto): Promise<Schedule> {
    const updates = {}

    if (updateScheduleDto.poolId) {
      updates['poolId'] = new ObjectId(updateScheduleDto.poolId)
    }

    if (updateScheduleDto.instructorId) {
      updates['instructorId'] = new ObjectId(updateScheduleDto.instructorId)
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
      { _id: new ObjectId(updateScheduleDto.id) },
      {
        $set: {
          ...updates,
        },
      },
    )
    const entity = await this.model.findById(new ObjectId(updateScheduleDto.id))
    if (!entity) {
      throw new Error('Product not found')
    }
    return mapper(entity)
  }

  async remove(id: string): Promise<void> {
    await this.model.deleteOne({ _id: new ObjectId(id) })
  }

  async findAllParentTot() {
    const result = await this.model.find({
      lessonType: LessonTypesEnum.GROUP,
    })

    return result.map(mapper)
  }
}
