import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class FindAllSchedulesRequestDto {
  @ApiPropertyOptional({ description: 'Comma-separated list of schedule IDs to filter by' })
  @IsOptional()
  @IsString()
  scheduleIds?: string
}
