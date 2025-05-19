import { ApiProperty } from '@nestjs/swagger'

export class SiteConfigResponseDto {
  @ApiProperty({ example: '609e129e8bfa4a0015bfae1c', description: 'Unique identifier for the site config' })
  id: string

  @ApiProperty({ example: true, description: 'Whether the waitlist is enabled' })
  waitlistEnabled: boolean
}
