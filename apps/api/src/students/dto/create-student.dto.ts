import { IsDate, IsDateString, IsNotEmpty, IsString } from 'class-validator'
export class CreateStudentDto {
  userId: string
  @IsString()
  name: string
  @IsDateString()
  birthday: string
  @IsString()
  ability: string
  @IsString()
  notes: string
}
