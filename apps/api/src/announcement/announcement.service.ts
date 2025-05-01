import { Injectable } from '@nestjs/common'
import { Model, Types } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Announcement } from './announcement'
import { AnnouncementEntity } from './entities/announcement.entity'
import { CreateAnnouncementDto } from '@lesson-scheduler/shared'

const mapper = (entity: AnnouncementEntity): Announcement => {
  return {
    id: entity._id.toString(),
    heading: entity.heading,
    content: entity.content,
    title: entity.title,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  }
}

@Injectable()
export class AnnouncementService {
  constructor(
    @InjectModel(AnnouncementEntity.name)
    private readonly model: Model<AnnouncementEntity>,
  ) {}

  // Only one announcement is allowed
  async create(announcement: CreateAnnouncementDto): Promise<Announcement> {
    let entity = await this.model.findOne()

    if (entity == null) {
      const _id = new Types.ObjectId()
      await this.model.create({
        _id,
        heading: announcement.heading,
        content: announcement.content,
        title: announcement.title,
      })
    } else {
      await this.model.updateOne(
        { _id: entity._id },
        {
          $set: {
            heading: announcement.heading,
            content: announcement.content,
            title: announcement.title,
          },
        },
      )
    }
    entity = await this.model.findOne()
    if (!entity) {
      throw new Error('Announcement not found')
    }
    return mapper(entity)
  }

  async findOne(): Promise<Announcement | null> {
    const entity = await this.model.findOne()
    if (!entity) {
      return null
    }
    return mapper(entity)
  }
}
