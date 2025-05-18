import { IsOptional } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { Role } from '@lesson-scheduler/shared'
export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  firstName: string
  @ApiPropertyOptional()
  @IsOptional()
  lastName: string
  @ApiPropertyOptional()
  @IsOptional()
  email: string
  @ApiPropertyOptional()
  @IsOptional()
  password: string
  @ApiPropertyOptional()
  @IsOptional()
  address1: string
  @ApiPropertyOptional()
  @IsOptional()
  address2: string
  @ApiPropertyOptional()
  @IsOptional()
  city: string
  @ApiPropertyOptional()
  @IsOptional()
  state: string
  @ApiPropertyOptional()
  @IsOptional()
  zip: string
  @ApiPropertyOptional()
  @IsOptional()
  phone: string
  @ApiPropertyOptional()
  @IsOptional()
  privateRegistration: boolean
  @ApiPropertyOptional()
  @IsOptional()
  waiverSignature: string
  @ApiPropertyOptional()
  @IsOptional()
  waiverSignatureDate: Date
  @ApiPropertyOptional()
  @IsOptional()
  instructorId: string
  @ApiPropertyOptional({ enum: Role })
  @IsOptional()
  role: Role
}
