import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types, Document } from 'mongoose'
import { CreditTypesEnum } from 'shared/credit-types.enum'
import { TransactionTypesEnum } from 'shared/transaction-types.enum'

@Schema({
  collection: 'transactions',
  timestamps: true,
})
export class TransactionEntity extends Document {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date

  @Prop({ required: true })
  userId: Types.ObjectId

  @Prop({ required: true })
  productId: Types.ObjectId

  @Prop({ required: true, type: String, enum: TransactionTypesEnum })
  transactionType: TransactionTypesEnum

  @Prop({ type: String, required: true, enum: CreditTypesEnum })
  creditType: CreditTypesEnum

  @Prop({ required: true })
  credits: number

  @Prop({ required: true })
  amount: number

  @Prop({ required: false })
  scheduleId: Types.ObjectId

  @Prop({ required: false })
  paymentId: Types.ObjectId
}

export const TransactionSchema = SchemaFactory.createForClass(TransactionEntity)
