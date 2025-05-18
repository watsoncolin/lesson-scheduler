import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class PaginatedResponseDto<T> {
  @ApiProperty({ isArray: true })
  @Type(() => Object)
  data: T[]

  @ApiProperty()
  total: number

  @ApiProperty()
  page: number

  @ApiProperty()
  limit: number
}
