import { IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
export class StatsResponseDto {
  @IsNumber()
  @ApiProperty({ description: 'The number of private lessons purchased' })
  privateLessons: number

  @IsNumber()
  @ApiProperty({ description: 'The number of group lessons purchased' })
  groupLessons: number

  @IsNumber()
  @ApiProperty({ description: 'The number of available lessons' })
  availableLessons: number

  @IsNumber()
  @ApiProperty({ description: 'The number of scheduled lessons' })
  scheduledLessons: number

  @IsNumber()
  @ApiProperty({ description: 'The number of unscheduled private lessons' })
  unscheduledPrivateLessons: number

  @IsNumber()
  @ApiProperty({ description: 'The number of unscheduled group lessons' })
  unscheduledGroupLessons: number

  @IsNumber()
  @ApiProperty({ description: 'The number of active users' })
  activeUsers: number
}
