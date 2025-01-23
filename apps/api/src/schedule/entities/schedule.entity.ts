import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types, Document } from 'mongoose'
import { LessonTypesEnum } from 'shared/lesson-types.enum'

@Schema({
  timestamps: true,
})
export class RegistrationEntity extends Document {
  createdAt: Date
  updatedAt: Date
  @Prop({ required: true })
  userId: Types.ObjectId
  @Prop({ required: true })
  studentId: Types.ObjectId
  @Prop({ required: true })
  transactionId: Types.ObjectId
}

export const RegistrationSchema = SchemaFactory.createForClass(RegistrationEntity)

@Schema({
  collection: 'schedules',
  timestamps: true,
})
export class ScheduleEntity extends Document {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date
  @Prop({ required: true })
  poolId: string
  @Prop({ required: true })
  instructorId: string
  @Prop({ required: true })
  classSize: number
  @Prop({ type: String, required: true, enum: LessonTypesEnum })
  lessonType: LessonTypesEnum
  @Prop({ type: [RegistrationSchema], required: false })
  registrations: RegistrationEntity[]
  @Prop({ required: true })
  startDateTime: Date
  @Prop({ required: true })
  endDateTime: Date
}

export const ScheduleSchema = SchemaFactory.createForClass(ScheduleEntity)
