import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { LessonTypesEnum } from 'shared/lesson-types.enum'

export class CreateProductDto {
  @IsNumber()
  order: number
  @IsString()
  name: string
  @IsEnum(LessonTypesEnum)
  lessonType: LessonTypesEnum
  @IsString()
  description: string
  @IsNumber()
  credits: number
  @IsNumber()
  amount: number
  @IsBoolean()
  active: boolean = false
  @IsOptional()
  @IsString()
  scheduleId?: string
  @IsString({ each: true })
  features: string[]
}
