import { IsDate, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateStudentDto {
  @ApiProperty({ description: 'User ID', required: false })
  userId: string
  @ApiProperty({ description: 'Student name' })
  @IsString()
  name: string
  @ApiProperty({ description: 'Birthday (ISO date string)' })
  @IsDateString()
  birthday: string
  @ApiProperty({ description: 'Ability level' })
  @IsString()
  ability: string
  @ApiProperty({ description: 'Notes', required: false })
  @IsString()
  @IsOptional()
  notes: string
}
