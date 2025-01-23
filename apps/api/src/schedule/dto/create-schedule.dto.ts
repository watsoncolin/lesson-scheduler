import { IsBoolean, IsDate, IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { LessonTypesEnum } from 'shared/lesson-types.enum'

export class CreateScheduleDto {
  @IsString()
  poolId: string
  @IsString()
  instructorId: string
  @IsEnum(LessonTypesEnum)
  lessonType: LessonTypesEnum
  @IsNumber()
  classSize: number
  @IsDateString()
  startDateTime: string
  @IsDateString()
  endDateTime: string
}
