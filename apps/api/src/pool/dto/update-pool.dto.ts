import { PartialType } from '@nestjs/mapped-types'
import { IsOptional, IsString } from 'class-validator'
import { CreatePoolDto } from './create-pool.dto'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class UpdatePoolDto extends PartialType(CreatePoolDto) {
  @ApiProperty({ example: 'poolId123', description: 'ID of the pool' })
  id: string
  @ApiPropertyOptional({ example: 'Stansbury Pool', description: 'Name of the pool' })
  @IsString()
  @IsOptional()
  name?: string
  @ApiPropertyOptional({ example: '123 Main St, Stansbury', description: 'Address of the pool' })
  @IsOptional()
  @IsString()
  address?: string
  @ApiPropertyOptional({ example: 'Outdoor pool with 8 lanes', description: 'Details about the pool' })
  @IsOptional()
  @IsString()
  details?: string
  @ApiPropertyOptional({ example: 'https://example.com/pool.jpg', description: 'Image URL of the pool' })
  @IsOptional()
  @IsString()
  imageUrl?: string
}
