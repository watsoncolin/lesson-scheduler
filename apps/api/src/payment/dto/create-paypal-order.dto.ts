import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CreatePaypalOrderDto {
  @IsString()
  userId: string
  @IsString()
  productId: string
  @IsNumber()
  quantity: number
  @IsString()
  @IsOptional()
  scheduleId?: string
  @IsString()
  @IsOptional()
  studentId?: string
}
