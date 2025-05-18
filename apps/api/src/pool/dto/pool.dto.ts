import { ApiProperty } from '@nestjs/swagger'

export class PoolDto {
  @ApiProperty({ example: 'poolId123', description: 'ID of the pool' })
  id: string

  @ApiProperty({ example: 'Stansbury Pool', description: 'Name of the pool' })
  name: string

  @ApiProperty({ example: '123 Main St, Stansbury', description: 'Address of the pool' })
  address: string

  @ApiProperty({ example: 'Outdoor pool with 8 lanes', description: 'Details about the pool' })
  details: string

  @ApiProperty({ example: 'https://example.com/pool.jpg', description: 'Image URL of the pool' })
  imageUrl: string
}
