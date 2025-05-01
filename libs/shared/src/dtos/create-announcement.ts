import { IsNotEmpty, IsString } from 'class-validator'

export class CreateAnnouncementDto {
  @IsNotEmpty()
  @IsString()
  heading: string

  @IsNotEmpty()
  @IsString()
  content: string

  @IsNotEmpty()
  @IsString()
  title: string
}
