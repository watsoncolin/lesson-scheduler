import { IsArray, IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator'
import { Transform } from 'class-transformer'

export class SearchScheduleDto {
  @Transform(({ value }) => {
    return value?.split(',').map(item => item.trim()) ?? []
  })
  @IsArray()
  @IsOptional()
  pools?: string[]

  @Transform(({ value }) => {
    return value?.split(',').map(item => item.trim()) ?? []
  })
  @IsArray()
  @IsOptional()
  instructors?: string[]
  @Transform(({ value }) => {
    return value?.split(',').map(item => item.trim()) ?? []
  })
  @IsArray()
  @IsOptional()
  daysOfWeek?: string[]

  @IsDateString()
  @IsOptional()
  date?: string

  @IsString()
  @IsOptional()
  timezone?: string

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    return value === 'true'
  })
  includeReserved?: boolean
}
