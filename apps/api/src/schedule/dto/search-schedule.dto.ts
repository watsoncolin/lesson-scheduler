import { IsArray, IsDateString, IsOptional } from 'class-validator'
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
}
