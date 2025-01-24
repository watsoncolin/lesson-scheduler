import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types, Document } from 'mongoose'

@Schema({
  collection: 'config',
  timestamps: true,
})
export class SiteConfigEntity extends Document {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date

  @Prop({ required: true })
  waitlistEnabled: boolean
}

export const SiteConfigSchema = SchemaFactory.createForClass(SiteConfigEntity)
