import { ApiProperty } from '@nestjs/swagger'

export class StudentSummaryDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  userId: string

  @ApiProperty()
  name: string

  @ApiProperty()
  birthday: string

  @ApiProperty()
  notes: string
}

export class UserSearchResponseDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  email: string

  @ApiProperty()
  firstName: string

  @ApiProperty()
  lastName: string

  @ApiProperty()
  phone: string

  @ApiProperty()
  unusedCredits: number

  @ApiProperty()
  totalCredits: number

  @ApiProperty({ type: [StudentSummaryDto] })
  students: StudentSummaryDto[]

  @ApiProperty({ required: false })
  instructorId?: string
}
