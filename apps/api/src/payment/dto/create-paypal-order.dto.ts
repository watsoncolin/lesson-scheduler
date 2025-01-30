import { IsNumber, IsString } from 'class-validator'

export class CreatePaypalOrderDto {
  @IsString()
  userId: string
  @IsString()
  productId: string
  @IsNumber()
  quantity: number
}
