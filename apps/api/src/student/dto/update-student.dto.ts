import { PartialType } from '@nestjs/mapped-types'
import { CreateStudentDto } from './create-student.dto'
import { IsDateString, IsOptional, IsString } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @ApiProperty({ description: 'Student ID' })
  id: string
  @ApiPropertyOptional({ description: 'Student name' })
  @IsString()
  @IsOptional()
  name?: string
  @ApiPropertyOptional({ description: 'Birthday (ISO date string)' })
  @IsOptional()
  @IsDateString()
  birthday?: string
  @ApiPropertyOptional({ description: 'Ability level' })
  @IsOptional()
  @IsString()
  ability?: string
  @ApiPropertyOptional({ description: 'Notes' })
  @IsOptional()
  @IsString()
  notes?: string
}
