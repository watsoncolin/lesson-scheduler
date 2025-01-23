import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { ObjectId } from 'mongodb'
import { CreatePoolDto } from './dto/create-pool.dto'
import { UpdatePoolDto } from './dto/update-pool.dto'
import { PoolEntity } from './entities/pool.entity'
import { Pool } from './pool'

const mapper = (entity: PoolEntity): Pool => {
  return {
    id: entity._id.toString(),
    name: entity.name,
    address: entity.address,
    details: entity.details,
    imageUrl: entity.imageUrl,
  }
}

@Injectable()
export class PoolService {
  constructor(
    @InjectModel(PoolEntity.name)
    private readonly model: Model<PoolEntity>,
  ) {}
  async create(createPoolDto: CreatePoolDto): Promise<Pool> {
    const _id = new ObjectId()
    const result = await this.model.create({
      _id,
      name: createPoolDto.name,
      address: createPoolDto.address,
      details: createPoolDto.details,
      imageUrl: createPoolDto.imageUrl,
    })
    const entity = await this.model.findById(result._id)
    if (!entity) {
      throw new Error('Pool not found')
    }
    return mapper(entity)
  }

  async findAll(): Promise<Pool[]> {
    return (await this.model.find()).map(mapper)
  }

  async findAllByUserId(userId: string): Promise<Pool[]> {
    return (await this.model.find({ userId: new ObjectId(userId) })).map(mapper)
  }

  async findOne(id: string): Promise<Pool> {
    const entity = await this.model.findById(new ObjectId(id))
    if (!entity) {
      throw new Error('Pool not found')
    }
    return mapper(entity)
  }

  async update(updatePoolDto: UpdatePoolDto): Promise<Pool> {
    const updates = {}
    if (updatePoolDto.name) {
      updates['name'] = updatePoolDto.name
    }
    if (updatePoolDto.address) {
      updates['address'] = updatePoolDto.address
    }
    if (updatePoolDto.details) {
      updates['details'] = updatePoolDto.details
    }
    if (updatePoolDto.imageUrl) {
      updates['imageUrl'] = updatePoolDto.imageUrl
    }

    await this.model.updateOne(
      { _id: new ObjectId(updatePoolDto.id) },
      {
        $set: {
          ...updates,
        },
      },
    )
    const entity = await this.model.findById(new ObjectId(updatePoolDto.id))
    if (!entity) {
      throw new Error('Pool not found')
    }
    return mapper(entity)
  }

  async remove(id: string): Promise<void> {
    await this.model.deleteOne({ _id: new ObjectId(id) })
  }
}
