import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { Transform } from 'class-transformer'
import { LessonTypesEnum } from 'shared/lesson-types.enum'
import { ApiProperty } from '@nestjs/swagger'

export class CreateProductDto {
  @ApiProperty({ example: 1, description: 'Order of the product' })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  order: number
  @ApiProperty({ example: 'Product Name', description: 'Name of the product' })
  @IsString()
  name: string
  @ApiProperty({ enum: LessonTypesEnum, description: 'Type of lesson' })
  @IsEnum(LessonTypesEnum)
  lessonType: LessonTypesEnum
  @ApiProperty({ example: 'Description of the product', description: 'Product description' })
  @IsString()
  description: string
  @ApiProperty({ example: 10, description: 'Number of credits' })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  credits: number
  @ApiProperty({ example: 100, description: 'Amount for the product' })
  @IsNumber()
  @Transform(({ value }) => Number(value))
  amount: number
  @ApiProperty({ example: true, description: 'Is the product active?' })
  @IsBoolean()
  active: boolean = false
  @ApiProperty({ example: 'scheduleId123', required: false, description: 'Optional schedule ID' })
  @IsOptional()
  @IsString()
  scheduleId?: string
  @ApiProperty({ type: [String], description: 'List of product features' })
  @IsString({ each: true })
  features: string[]
}
