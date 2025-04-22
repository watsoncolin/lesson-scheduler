import { IsDateString, IsOptional, IsString } from 'class-validator'

export class CreateStudentDto {
  @IsString()
  firstName!: string

  @IsString()
  lastName!: string

  @IsDateString()
  birthDate!: string
}

export class UpdateStudentDto {
  @IsString()
  id!: string

  @IsString()
  @IsOptional()
  firstName?: string

  @IsString()
  @IsOptional()
  lastName?: string

  @IsDateString()
  @IsOptional()
  birthDate?: string
}
