import { PartialType } from '@nestjs/mapped-types'
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { CreateScheduleDto } from './create-schedule.dto'
import { LessonTypesEnum } from 'shared/lesson-types.enum'

export class UpdateScheduleDto extends PartialType(CreateScheduleDto) {
  id: string
  @IsString()
  @IsOptional()
  poolId?: string
  @IsString()
  @IsOptional()
  instructorId?: string
  @IsEnum(LessonTypesEnum)
  @IsOptional()
  lessonType?: LessonTypesEnum
  @IsNumber()
  @IsOptional()
  classSize?: number
  @IsOptional()
  @IsString()
  startDateTime?: string
  @IsOptional()
  @IsString()
  endDateTime?: string
}
