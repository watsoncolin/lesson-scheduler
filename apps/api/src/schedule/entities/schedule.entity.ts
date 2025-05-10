import { Type } from '@nestjs/common'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types, Document } from 'mongoose'
import { LessonTypesEnum } from 'shared/lesson-types.enum'

export enum ScheduleStatusEnum {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
}

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
  poolId: Types.ObjectId
  @Prop({ required: true })
  instructorId: Types.ObjectId
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
  @Prop({ type: String, required: true, enum: ScheduleStatusEnum, default: ScheduleStatusEnum.ACTIVE })
  status: ScheduleStatusEnum
}

export const ScheduleSchema = SchemaFactory.createForClass(ScheduleEntity)
