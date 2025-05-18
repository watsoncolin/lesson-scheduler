import { ApiProperty } from '@nestjs/swagger'
import { IsString, MinLength } from 'class-validator'

export class ResetPasswordDto {
  @ApiProperty({ example: 'reset-token-value', description: 'Password reset token' })
  @IsString()
  token: string

  @ApiProperty({ example: 'newPassword123', description: 'New password' })
  @IsString()
  @MinLength(8)
  password: string
}
