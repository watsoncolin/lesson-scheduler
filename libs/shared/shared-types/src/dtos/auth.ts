import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class SignInDto {
  @IsEmail()
  email!: string

  @IsString()
  password!: string
}

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

export class RefreshTokenDto {
  @IsNotEmpty()
  refreshToken!: string
}

export class GoogleTokenDto {
  @IsNotEmpty()
  token!: string
}

export class ForgotPasswordDto {
  @IsEmail()
  email!: string
}

export class ResetPasswordDto {
  @IsString()
  token!: string

  @IsString()
  @MinLength(8)
  password!: string
}
