import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types, Document } from 'mongoose'

@Schema({
  collection: 'students',
  timestamps: true,
})
export class StudentEntity extends Document {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date

  @Prop({ required: true })
  userId: Types.ObjectId

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  birthday: Date

  @Prop({ required: true })
  ability: string

  @Prop({ required: true })
  notes: string
}

export const StudentSchema = SchemaFactory.createForClass(StudentEntity)
