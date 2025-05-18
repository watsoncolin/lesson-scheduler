import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator'
import { Transform } from 'class-transformer'

export class SearchScheduleRequestDto {
  @ApiPropertyOptional({ type: [String], description: 'List of pool IDs' })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value
    if (typeof value === 'string') return value.split(',').map((item: string) => item.trim())
    return []
  })
  @IsOptional()
  @IsString({ each: true })
  pools?: string[]

  @ApiPropertyOptional({ type: [String], description: 'List of instructor IDs' })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value
    if (typeof value === 'string') return value.split(',').map((item: string) => item.trim())
    return []
  })
  @IsOptional()
  @IsString({ each: true })
  instructors?: string[]

  @ApiPropertyOptional({ type: [String], description: 'List of days of the week' })
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value
    if (typeof value === 'string') return value.split(',').map((item: string) => item.trim())
    return []
  })
  @IsOptional()
  @IsString({ each: true })
  daysOfWeek?: string[]

  @ApiPropertyOptional({ description: 'Date to search for (YYYY-MM-DD)' })
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsDateString()
  @IsOptional()
  date?: string

  @ApiPropertyOptional({ description: 'Timezone' })
  @IsString()
  @IsOptional()
  timezone?: string

  @ApiPropertyOptional({ description: 'Include reserved schedules' })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  includeReserved?: boolean
}
