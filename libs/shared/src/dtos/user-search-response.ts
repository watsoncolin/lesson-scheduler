import { IsArray, IsNumber } from 'class-validator'
import { IsString } from 'class-validator'
import { IsNotEmpty } from 'class-validator'
import { IStudent } from '../interfaces/student'

export class UserSearchResponseDto {
  @IsString()
  @IsNotEmpty()
  id: string

  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  lastName: string

  @IsString()
  @IsNotEmpty()
  phone: string

  @IsNumber()
  @IsNotEmpty()
  unusedCredits: number

  @IsNumber()
  @IsNotEmpty()
  totalCredits: number

  @IsArray()
  @IsNotEmpty()
  students: IStudent[]
}
