import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { LessonTypesEnum } from '../enums/lesson-types.enum'

export class CreateProductDto {
  @IsNumber()
  order!: number

  @IsString()
  name!: string

  @IsEnum(LessonTypesEnum)
  lessonType!: LessonTypesEnum

  @IsString()
  description!: string

  @IsNumber()
  credits!: number

  @IsNumber()
  amount!: number

  @IsBoolean()
  active: boolean = false

  @IsOptional()
  @IsString()
  scheduleId?: string

  @IsString({ each: true })
  features!: string[]
}

export class UpdateProductDto {
  @IsString()
  id!: string

  @IsNumber()
  @IsOptional()
  order?: number

  @IsString()
  @IsOptional()
  name?: string

  @IsEnum(LessonTypesEnum)
  @IsOptional()
  lessonType?: LessonTypesEnum

  @IsString()
  @IsOptional()
  description?: string

  @IsNumber()
  @IsOptional()
  credits?: number

  @IsNumber()
  @IsOptional()
  amount?: number

  @IsBoolean()
  @IsOptional()
  active?: boolean

  @IsString()
  @IsOptional()
  scheduleId?: string

  @IsString({ each: true })
  @IsOptional()
  features?: string[]
}
