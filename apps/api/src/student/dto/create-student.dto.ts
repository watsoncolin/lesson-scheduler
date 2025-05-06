import { IsDate, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator'
export class CreateStudentDto {
  userId: string
  @IsString()
  name: string
  @IsDateString()
  birthday: string
  @IsString()
  ability: string
  @IsString()
  @IsOptional()
  notes: string
}
