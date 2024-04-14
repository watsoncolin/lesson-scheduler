import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserEntity {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date
  @Prop({ type: String, required: false, select: false })
  password?: string
  @Prop({ required: true })
  firstName: string
  @Prop({ required: true })
  lastName: string
  @Prop({ required: true })
  email: string
  @Prop({ required: false })
  address1: string
  @Prop({ required: false })
  address2: string
  @Prop({ required: false })
  city: string
  @Prop({ required: false })
  state: string
  @Prop({ required: false })
  zip: string
  @Prop({ required: false })
  phone: string
  @Prop({ required: true, default: false })
  privateRegistration: boolean
}

export const UserSchema = SchemaFactory.createForClass(UserEntity)
