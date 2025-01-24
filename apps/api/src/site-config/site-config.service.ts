import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { ObjectId } from 'mongodb'
import { SiteConfig } from './site-config'
import { SiteConfigEntity } from './entities/site-config.entity'

const mapper = (entity: SiteConfigEntity): SiteConfig => {
  return {
    id: entity._id.toString(),
    waitlistEnabled: entity.waitlistEnabled,
  }
}

@Injectable()
export class SiteConfigService {
  constructor(
    @InjectModel(SiteConfigEntity.name)
    private readonly model: Model<SiteConfigEntity>,
  ) {}
  async toggleWaitlist(): Promise<SiteConfig> {
    let entity = await this.model.findOne()

    if (entity == null) {
      const _id = new ObjectId()
      await this.model.create({
        _id,
        waitlistEnabled: true,
      })
    } else {
      await this.model.updateOne(
        { _id: entity._id },
        {
          $set: {
            waitlistEnabled: !entity.waitlistEnabled,
          },
        },
      )
    }
    entity = await this.model.findOne()
    if (!entity) {
      throw new Error('Config not found')
    }
    return mapper(entity)
  }

  async findOne(): Promise<SiteConfig> {
    const entity = await this.model.findOne()
    if (!entity) {
      throw new Error('Config not found')
    }
    return mapper(entity)
  }
}
