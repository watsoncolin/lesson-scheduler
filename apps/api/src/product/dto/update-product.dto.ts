import { PartialType } from '@nestjs/mapped-types'
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { CreateProductDto } from './create-product.dto'
import { LessonTypesEnum } from 'shared/lesson-types.enum'

export class UpdateProductDto extends PartialType(CreateProductDto) {
  id: string
  @IsString()
  @IsOptional()
  name?: string
  @IsOptional()
  @IsEnum(LessonTypesEnum)
  lessonType?: LessonTypesEnum
  @IsOptional()
  @IsNumber()
  credits?: number
  @IsOptional()
  @IsBoolean()
  active?: boolean
  @IsOptional()
  @IsNumber()
  amount?: number
  @IsOptional()
  @IsString()
  description?: string
  @IsOptional()
  @IsString()
  scheduleId?: string
}
