import { ApiProperty } from '@nestjs/swagger'
import { LessonTypesEnum } from 'shared/lesson-types.enum'

export class ParentTotScheduleResponseDto {
  @ApiProperty({ example: 'scheduleId123', description: 'Schedule ID' })
  id: string

  @ApiProperty({ example: 'poolId123', description: 'Pool ID' })
  poolId: string

  @ApiProperty({ example: 'instructorId123', description: 'Instructor ID' })
  instructorId: string

  @ApiProperty({ example: 10, description: 'Class size' })
  classSize: number

  @ApiProperty({ enum: LessonTypesEnum, description: 'Type of lesson' })
  lessonType: LessonTypesEnum

  @ApiProperty({ example: '2024-06-01T10:00:00.000Z', description: 'Start date and time' })
  startDateTime: Date

  @ApiProperty({ example: '2024-06-01T11:00:00.000Z', description: 'End date and time' })
  endDateTime: Date

  @ApiProperty({ example: 5, description: 'Number of spots available' })
  spotsAvailable: number
}
