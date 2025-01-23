import { PartialType } from '@nestjs/mapped-types'
import { CreateStudentDto } from './create-student.dto'
import { IsDateString, IsOptional, IsString } from 'class-validator'

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  id: string
  @IsString()
  @IsOptional()
  name?: string
  @IsOptional()
  @IsDateString()
  birthday?: string
  @IsOptional()
  @IsString()
  ability?: string
  @IsOptional()
  @IsString()
  notes?: string
}
