import { BadRequestException, Injectable } from '@nestjs/common'
import { Model, Types } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { PaymentEntity } from './entities/payment.entity'
import { Payment } from './payment'
import { CreatePaymentDto } from './dto/create-payment.dto'
import { UpdatePaymentDto } from './dto/update-payment.dto'
import { ProductService } from 'product/product.service'
import { EventBus } from '@nestjs/cqrs'
import { PaymentCreatedEvent } from './events/payment-created.event'
import { PaymentUpdatedEvent } from './events/payment-updated.event'
import { PaymentStatusTypesEnum } from 'shared/payment-status-types.enum'
import { SiteConfigService } from 'site-config/site-config.service'
import { WaitlistService } from 'waitlist/waitlist.service'

const mapper = (entity: PaymentEntity): Payment => {
  return {
    id: entity._id.toString(),
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
    userId: entity.userId.toString(),
    productId: entity.productId.toString(),
    paymentGateway: entity.paymentGateway,
    paymentGatewayId: entity.paymentGatewayId,
    amount: entity.amount,
    status: entity.status,
    scheduleId: entity.scheduleId ? entity.scheduleId.toString() : undefined,
    studentId: entity.studentId ? entity.studentId.toString() : undefined,
  }
}

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(PaymentEntity.name)
    private readonly model: Model<PaymentEntity>,
    private readonly eventBus: EventBus,
    private readonly productService: ProductService,
    private readonly siteConfigService: SiteConfigService,
    private readonly waitlistService: WaitlistService,
  ) {}
  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const siteConfig = await this.siteConfigService.findOne()
    if (!siteConfig) {
      throw new Error('Site config not found')
    }
    if (siteConfig.waitlistEnabled) {
      try {
        const waitlist = await this.waitlistService.findByUserId(createPaymentDto.userId)
        if (!waitlist || !waitlist.allowed) {
          throw new BadRequestException('User not on waitlist or not allowed to purchase')
        }
      } catch (e) {
        throw new BadRequestException('User not on waitlist or not allowed to purchase')
      }
    }
    const product = await this.productService.findOne(createPaymentDto.productId)
    const _id = new Types.ObjectId()
    const result = await this.model.create({
      _id,
      userId: new Types.ObjectId(createPaymentDto.userId),
      productId: new Types.ObjectId(createPaymentDto.productId),
      amount: product.amount,
      paymentGateway: createPaymentDto.paymentGateway,
      paymentGatewayId: createPaymentDto.paymentGatewayId,
      status: createPaymentDto.status ?? PaymentStatusTypesEnum.PENDING,
      scheduleId: createPaymentDto.scheduleId ? new Types.ObjectId(createPaymentDto.scheduleId) : undefined,
      studentId: createPaymentDto.studentId ? new Types.ObjectId(createPaymentDto.studentId) : undefined,
    })
    const entity = await this.model.findById(result._id)
    if (!entity) {
      throw new Error('Payment not found')
    }
    const payment = mapper(entity)
    this.eventBus.publish(new PaymentCreatedEvent(payment))
    return payment
  }

  async findAll(): Promise<Payment[]> {
    return (await this.model.find()).map(mapper)
  }

  async findOne(id: string): Promise<Payment> {
    const entity = await this.model.findById(new Types.ObjectId(id))
    if (!entity) {
      throw new Error('Payment not found')
    }
    return mapper(entity)
  }

  async findByGatewayId(paymentGatewayId: string): Promise<Payment> {
    const entity = await this.model.findOne({ paymentGatewayId })
    if (!entity) {
      throw new Error('Payment not found')
    }
    return mapper(entity)
  }

  async update(updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    const updates: any = {}

    if (updatePaymentDto.status) {
      updates['status'] = updatePaymentDto.status
    }

    if (updatePaymentDto.paymentGatewayId) {
      updates['paymentGatewayId'] = updatePaymentDto.paymentGatewayId
    }

    await this.model.updateOne(
      { _id: new Types.ObjectId(updatePaymentDto.id) },
      {
        $set: {
          ...updates,
        },
      },
    )
    const entity = await this.model.findById(new Types.ObjectId(updatePaymentDto.id))
    if (!entity) {
      throw new Error('Payment not found')
    }
    const payment = mapper(entity)
    this.eventBus.publish(new PaymentUpdatedEvent(payment))
    return payment
  }
}
