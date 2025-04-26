import { IsNumber, IsOptional } from 'class-validator'
import { IsString } from 'class-validator'
import { IsNotEmpty } from 'class-validator'
import { IsEmail } from 'class-validator'
import { PaginationDto } from './pagination'

export class UserSearchRequestDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phone?: string
}
