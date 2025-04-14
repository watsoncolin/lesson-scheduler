import { IsBoolean, IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator'
import { Role } from '../interfaces/user'

export class SignUpDto {
  @IsEmail()
  email!: string

  @IsString()
  @MinLength(8)
  password!: string

  @IsString()
  firstName!: string

  @IsString()
  lastName!: string
}

export class SignInDto {
  @IsEmail()
  email!: string

  @IsString()
  password!: string
}

export class CreateUserDto extends SignUpDto {
  @IsBoolean()
  @IsOptional()
  privateRegistration?: boolean = false

  @IsEnum(Role)
  @IsOptional()
  role?: Role = Role.User
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  firstName?: string

  @IsString()
  @IsOptional()
  lastName?: string

  @IsEmail()
  @IsOptional()
  email?: string

  @IsString()
  @MinLength(8)
  @IsOptional()
  password?: string

  @IsString()
  @IsOptional()
  address1?: string

  @IsString()
  @IsOptional()
  address2?: string

  @IsString()
  @IsOptional()
  city?: string

  @IsString()
  @IsOptional()
  state?: string

  @IsString()
  @IsOptional()
  zip?: string

  @IsPhoneNumber()
  @IsOptional()
  phone?: string

  @IsBoolean()
  @IsOptional()
  privateRegistration?: boolean

  @IsEnum(Role)
  @IsOptional()
  role?: Role
}

export class RefreshTokenDto {
  @IsString()
  refreshToken!: string
}
