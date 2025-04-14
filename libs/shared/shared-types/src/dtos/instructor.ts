import { IsBoolean, IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator'

export class CreateInstructorDto {
  @IsString()
  firstName!: string

  @IsString()
  lastName!: string

  @IsEmail()
  email!: string

  @IsPhoneNumber()
  phone!: string

  @IsString()
  bio!: string

  @IsBoolean()
  active: boolean = false
}

export class UpdateInstructorDto {
  @IsString()
  id!: string

  @IsString()
  @IsOptional()
  firstName?: string

  @IsString()
  @IsOptional()
  lastName?: string

  @IsEmail()
  @IsOptional()
  email?: string

  @IsPhoneNumber()
  @IsOptional()
  phone?: string

  @IsString()
  @IsOptional()
  bio?: string

  @IsBoolean()
  @IsOptional()
  active?: boolean
}
