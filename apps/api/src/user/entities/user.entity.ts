import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { Role } from '../enums/role.enum'

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
  @Prop({ required: false })
  googleId?: string
  @Prop({ required: false })
  firstName: string
  @Prop({ required: false })
  lastName: string
  @Prop({ required: false })
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

  @Prop({ required: true, type: String, enum: Role, default: Role.User })
  role: Role

  @Prop({ required: false })
  resetToken: string
}

export const UserSchema = SchemaFactory.createForClass(UserEntity)
