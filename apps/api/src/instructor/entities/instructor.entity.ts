import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types, Document } from 'mongoose'

@Schema({
  collection: 'instructors',
  timestamps: true,
})
export class InstructorEntity extends Document {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date

  @Prop({ required: false })
  userId: Types.ObjectId

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  bio: string

  @Prop({ required: true })
  imageUrl: string
}

export const InstructorSchema = SchemaFactory.createForClass(InstructorEntity)
