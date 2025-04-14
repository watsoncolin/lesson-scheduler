import { Transform } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from 'class-validator'

export class SignUpDto {
  @IsEmail()
  email: string

  @MinLength(10)
  password: string

  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  lastName: string

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('US')
  @Transform(params => params.value.replace(/\D/g, ''))
  phoneNumber: string
}
