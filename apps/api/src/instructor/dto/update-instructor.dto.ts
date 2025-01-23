import { PartialType } from '@nestjs/mapped-types'
import { IsDateString, IsOptional, IsString } from 'class-validator'
import { CreateInstructorDto } from './create-instructor.dto'

export class UpdateInstructorDto extends PartialType(CreateInstructorDto) {
  id: string
  @IsString()
  @IsOptional()
  name?: string
  @IsOptional()
  @IsString()
  bio?: string
  @IsOptional()
  @IsString()
  imageUrl?: string
}
