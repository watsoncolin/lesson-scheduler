import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt } from 'class-validator'
import { IPaginatedQueryMeta } from './i-paginated-metadata'

export class PaginatedQueryDto implements IPaginatedQueryMeta {
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  page!: number

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  pageSize!: number
}
