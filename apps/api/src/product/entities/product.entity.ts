import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types, Document } from 'mongoose'
import { LessonTypesEnum } from 'shared/lesson-types.enum'

@Schema({
  collection: 'products',
  timestamps: true,
})
export class ProductEntity extends Document {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date

  @Prop({ required: true })
  order: number

  @Prop({ required: true })
  name: string

  @Prop({ type: String, required: true, enum: LessonTypesEnum })
  lessonType: LessonTypesEnum

  @Prop({ required: true })
  credits: number

  @Prop({ required: true })
  active: boolean

  @Prop({ required: true })
  amount: number

  @Prop({ required: true })
  description: string

  @Prop({ required: false })
  scheduleId: Types.ObjectId

  @Prop({ type: [String], required: false })
  features: string[]
}

export const ProductSchema = SchemaFactory.createForClass(ProductEntity)
