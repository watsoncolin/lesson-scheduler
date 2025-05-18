import { ApiProperty } from '@nestjs/swagger'

export class StudentResponseDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  userId: string

  @ApiProperty()
  name: string

  @ApiProperty()
  birthday: string

  @ApiProperty()
  ability: string

  @ApiProperty()
  notes: string
}
