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
  userId: string

  @Prop({ required: true })
  productId: string

  @Prop({ required: true })
  amount: number

  @Prop({ required: true, type: String, enum: PaymentGatewayTypesEnum })
  paymentGateway: PaymentGatewayTypesEnum

  @Prop({ required: true })
  paymentGatewayId: string

  @Prop({ required: true, type: String, enum: PaymentStatusTypesEnum })
  status: PaymentStatusTypesEnum
}

export const PaymentSchema = SchemaFactory.createForClass(PaymentEntity)
