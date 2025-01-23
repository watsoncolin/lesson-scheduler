import { IsOptional, IsString } from 'class-validator'
export class CreateInstructorDto {
  @IsOptional()
  userId: string
  @IsString()
  name: string
  @IsString()
  bio: string
  @IsString()
  imageUrl: string
}
