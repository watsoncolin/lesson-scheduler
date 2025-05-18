import { ApiProperty } from '@nestjs/swagger'
import { LessonTypesEnum, Role } from '@lesson-scheduler/shared'


class FindAllSchedulesUserDto {
  @ApiProperty()
  id: string
  @ApiProperty()
  firstName: string
  @ApiProperty()
  lastName: string
  @ApiProperty()
  email: string
  @ApiProperty({ enum: Role })
  role: Role
}

class FindAllSchedulesStudentDto {
  @ApiProperty()
  id: string
  @ApiProperty()
  name: string
  @ApiProperty()
  birthDate: string
  @ApiProperty()
  notes: string
}

class FindAllSchedulesRegistrationDto {
  @ApiProperty()
  studentId: string
  @ApiProperty()
  userId: string
  @ApiProperty()
  createdAt: string
  @ApiProperty({ type: FindAllSchedulesStudentDto })
  student: FindAllSchedulesStudentDto
  @ApiProperty({ type: FindAllSchedulesUserDto })
  user: FindAllSchedulesUserDto
}

export class FindAllSchedulesResponseDto {
  @ApiProperty()
  id: string
  @ApiProperty()
  poolId: string
  @ApiProperty()
  instructorId: string
  @ApiProperty()
  classSize: number
  @ApiProperty({ enum: LessonTypesEnum })
  lessonType: string
  @ApiProperty()
  startDateTime: string
  @ApiProperty()
  endDateTime: string
  @ApiProperty({ type: [FindAllSchedulesRegistrationDto] })
  registrations: FindAllSchedulesRegistrationDto[]
}
