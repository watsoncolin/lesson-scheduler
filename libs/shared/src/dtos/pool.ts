import { IsBoolean, IsOptional, IsString, IsUrl } from 'class-validator'

export class CreatePoolDto {
  @IsString()
  name!: string

  @IsString()
  address!: string

  @IsString()
  details!: string

  @IsUrl()
  imageUrl!: string

  @IsBoolean()
  active: boolean = false
}

export class UpdatePoolDto {
  @IsString()
  id!: string

  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  address?: string

  @IsString()
  @IsOptional()
  details?: string

  @IsUrl()
  @IsOptional()
  imageUrl?: string

  @IsBoolean()
  @IsOptional()
  active?: boolean
}
