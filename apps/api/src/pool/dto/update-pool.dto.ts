import { PartialType } from '@nestjs/mapped-types'
import { IsOptional, IsString } from 'class-validator'
import { CreatePoolDto } from './create-pool.dto'

export class UpdatePoolDto extends PartialType(CreatePoolDto) {
  id: string
  @IsString()
  @IsOptional()
  name?: string
  @IsOptional()
  @IsString()
  address?: string
  @IsOptional()
  @IsString()
  details?: string
  @IsOptional()
  @IsString()
  imageUrl?: string
}
