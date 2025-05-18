import { ApiProperty } from '@nestjs/swagger'

export class UserSearchRequestDto {
  @ApiProperty({ required: false, default: 1 })
  page?: number = 1

  @ApiProperty({ required: false, default: 50 })
  limit?: number = 50

  @ApiProperty({ required: false })
  name?: string

  @ApiProperty({ required: false })
  phone?: string
}
