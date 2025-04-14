import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { Model, Types } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { WaitlistEntity } from './entities/waitlist.entity'
import { Waitlist } from './waitlist'

const mapper = (entity: WaitlistEntity): Waitlist => {
  return {
    id: entity._id.toString(),
    userId: entity.userId.toString(),
    allowed: entity.allowed,
    allowedOn: entity.allowedOn,
  }
}

@Injectable()
export class WaitlistService {
  constructor(
    @InjectModel(WaitlistEntity.name)
    private readonly model: Model<WaitlistEntity>,
  ) {}
  async join(userId: string): Promise<Waitlist> {
    const _id = new Types.ObjectId()
    const result = await this.model.create({
      _id,
      userId: new Types.ObjectId(userId),
      allowed: false,
    })
    const entity = await this.model.findById(result._id)
    if (!entity) {
      throw new BadRequestException('Waitlist not found')
    }
    return mapper(entity)
  }

  async findAll(): Promise<Waitlist[]> {
    return (await this.model.find()).map(mapper)
  }

  async findByUserId(userId: string): Promise<Waitlist> {
    const waitlist = await this.model.findOne({ userId: new Types.ObjectId(userId) })
    if (!waitlist) {
      throw new NotFoundException('Waitlist not found')
    }
    return mapper(waitlist)
  }

  async allowPurchase(userId: string): Promise<Waitlist> {
    await this.model.updateOne(
      { userId: new Types.ObjectId(userId) },
      {
        $set: {
          allowed: true,
          allowedOn: new Date(),
        },
      },
    )
    const entity = await this.model.findOne({ userId: new Types.ObjectId(userId) })
    if (!entity) {
      throw new BadRequestException('User is not allowed to purchase. While on waitlist.')
    }
    return mapper(entity)
  }

  async remove(id: string): Promise<void> {
    await this.model.deleteOne({ _id: new Types.ObjectId(id) })
  }
}
