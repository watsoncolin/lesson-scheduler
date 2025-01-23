import { IsString } from 'class-validator'
export class CreatePoolDto {
  @IsString()
  name: string
  @IsString()
  address: string
  @IsString()
  details: string
  @IsString()
  imageUrl: string
}
