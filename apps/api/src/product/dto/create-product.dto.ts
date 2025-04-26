import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { Transform } from 'class-transformer'
import { LessonTypesEnum } from 'shared/lesson-types.enum'

export class CreateProductDto {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  order: number
  @IsString()
  name: string
  @IsEnum(LessonTypesEnum)
  lessonType: LessonTypesEnum
  @IsString()
  description: string
  @IsNumber()
  @Transform(({ value }) => Number(value))
  credits: number
  @IsNumber()
  @Transform(({ value }) => Number(value))
  amount: number
  @IsBoolean()
  active: boolean = false
  @IsOptional()
  @IsString()
  scheduleId?: string
  @IsString({ each: true })
  features: string[]
}
