import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RefreshTokenDto {
  @ApiProperty({ example: 'refresh-token-value', description: 'Refresh token' })
  @IsNotEmpty()
  refreshToken: string
}
