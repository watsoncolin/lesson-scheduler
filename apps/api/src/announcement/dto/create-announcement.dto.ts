import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateAnnouncementDto {
  @ApiProperty()
  @IsString()
  heading: string

  @ApiProperty()
  @IsString()
  content: string

  @ApiProperty()
  @IsString()
  title: string
}
