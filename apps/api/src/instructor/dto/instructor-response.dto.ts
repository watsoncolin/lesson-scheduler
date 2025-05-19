import { ApiProperty } from '@nestjs/swagger'

export class InstructorResponseDto {
  @ApiProperty({ type: String })
  id: string

  @ApiProperty({ type: String, required: false })
  userId?: string

  @ApiProperty()
  name: string

  @ApiProperty()
  bio: string

  @ApiProperty()
  imageUrl: string
}
