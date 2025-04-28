import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types, Document } from 'mongoose'
import { PaymentGatewayTypesEnum } from 'shared/payment-gateway-types.enum'
import { PaymentStatusTypesEnum } from 'shared/payment-status-types.enum'

@Schema({
  collection: 'payments',
  timestamps: true,
})
export class PaymentEntity extends Document {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date

  @Prop({ required: true })
  userId: Types.ObjectId

  @Prop({ required: true })
  productId: Types.ObjectId

  @Prop({ required: true })
  amount: number

  @Prop({ required: true })
  quantity: number

  @Prop({ required: true, type: String, enum: PaymentGatewayTypesEnum })
  paymentGateway: PaymentGatewayTypesEnum

  @Prop({ required: true })
  paymentGatewayId: string

  @Prop({ required: true, type: String, enum: PaymentStatusTypesEnum })
  status: PaymentStatusTypesEnum

  @Prop({ required: false })
  scheduleId?: Types.ObjectId

  @Prop({ required: false })
  studentId?: Types.ObjectId
}

export const PaymentSchema = SchemaFactory.createForClass(PaymentEntity)
