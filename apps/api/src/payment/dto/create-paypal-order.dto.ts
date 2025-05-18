import { IsNumber, IsOptional, IsString } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreatePaypalOrderDto {
  @ApiProperty({ type: String })
  @IsString()
  userId: string
  @ApiProperty({ type: String })
  @IsString()
  productId: string
  @ApiProperty({ type: Number })
  @IsNumber()
  quantity: number
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  scheduleId?: string
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  studentId?: string
}
