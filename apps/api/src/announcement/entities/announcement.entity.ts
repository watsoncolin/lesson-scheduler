import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types, Document } from 'mongoose'

@Schema({
  collection: 'announcements',
  timestamps: true,
})
export class AnnouncementEntity extends Document {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date

  @Prop({ required: true })
  heading: string

  @Prop({ required: true })
  content: string

  @Prop({ required: true })
  title: string
}

export const AnnouncementSchema = SchemaFactory.createForClass(AnnouncementEntity)
