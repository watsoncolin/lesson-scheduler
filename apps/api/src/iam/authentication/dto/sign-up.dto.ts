import { Transform } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class SignUpDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  @IsEmail()
  email: string

  @ApiProperty({ example: 'password123', description: 'User password' })
  @MinLength(10)
  password: string

  @ApiProperty({ example: 'John', description: 'First name' })
  @IsString()
  @IsNotEmpty()
  firstName: string

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  @IsString()
  @IsNotEmpty()
  lastName: string

  @ApiProperty({ example: '(555) 555-5555', description: 'User phone number' })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('US')
  @Transform(params => params.value.replace(/\D/g, ''))
  phoneNumber: string
}
