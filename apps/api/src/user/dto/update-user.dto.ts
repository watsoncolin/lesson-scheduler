import { IsOptional } from 'class-validator'
import { Role } from '@lesson-scheduler/shared'
export class UpdateUserDto {
  @IsOptional()
  firstName: string
  @IsOptional()
  lastName: string
  @IsOptional()
  email: string
  @IsOptional()
  password: string
  @IsOptional()
  address1: string
  @IsOptional()
  address2: string
  @IsOptional()
  city: string
  @IsOptional()
  state: string
  @IsOptional()
  zip: string
  @IsOptional()
  phone: string
  @IsOptional()
  privateRegistration: boolean
  @IsOptional()
  waiverSignature: string
  @IsOptional()
  waiverSignatureDate: Date
  @IsOptional()
  instructorId: string
  @IsOptional()
  role: Role
}
