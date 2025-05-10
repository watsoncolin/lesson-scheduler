import { IsNumber, IsOptional } from 'class-validator'
import { IsString } from 'class-validator'
import { IsEmail } from 'class-validator'
import { PaginationDto } from './pagination'

export class UserSearchRequestDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  phone?: string
}
