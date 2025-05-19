import { PartialType } from '@nestjs/mapped-types'
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { CreateProductDto } from './create-product.dto'
import { LessonTypesEnum } from 'shared/lesson-types.enum'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({ example: 'productId123', description: 'Product ID' })
  id: string
  @ApiProperty({ example: 'Product Name', required: false, description: 'Name of the product' })
  @IsString()
  @IsOptional()
  name?: string
  @ApiProperty({ enum: LessonTypesEnum, required: false, description: 'Type of lesson' })
  @IsOptional()
  @IsEnum(LessonTypesEnum)
  lessonType?: LessonTypesEnum
  @ApiProperty({ example: 10, required: false, description: 'Number of credits' })
  @IsOptional()
  @IsNumber()
  credits?: number
  @ApiProperty({ example: true, required: false, description: 'Is the product active?' })
  @IsOptional()
  @IsBoolean()
  active?: boolean
  @ApiProperty({ example: 100, required: false, description: 'Amount for the product' })
  @IsOptional()
  @IsNumber()
  amount?: number
  @ApiProperty({ example: 'Description of the product', required: false, description: 'Product description' })
  @IsOptional()
  @IsString()
  description?: string
  @ApiProperty({ example: 'scheduleId123', required: false, description: 'Optional schedule ID' })
  @IsOptional()
  @IsString()
  scheduleId?: string
}
