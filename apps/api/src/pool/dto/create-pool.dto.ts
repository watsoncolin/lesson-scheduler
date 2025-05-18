import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreatePoolDto {
  @ApiProperty({ example: 'Stansbury Pool', description: 'Name of the pool' })
  @IsString()
  name: string

  @ApiProperty({ example: '123 Main St, Stansbury', description: 'Address of the pool' })
  @IsString()
  address: string

  @ApiProperty({ example: 'Outdoor pool with 8 lanes', description: 'Details about the pool' })
  @IsString()
  details: string

  @ApiProperty({ example: 'https://example.com/pool.jpg', description: 'Image URL of the pool' })
  @IsString()
  imageUrl: string
}
