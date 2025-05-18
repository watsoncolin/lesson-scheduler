import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { PaymentGatewayTypesEnum } from 'shared/payment-gateway-types.enum'
import { PaymentStatusTypesEnum } from 'shared/payment-status-types.enum'

export class PaymentResponseDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  @ApiProperty()
  userId: string

  @ApiProperty()
  productId: string

  @ApiProperty()
  paymentGateway: PaymentGatewayTypesEnum

  @ApiProperty()
  paymentGatewayId: string

  @ApiProperty()
  amount: number

  @ApiProperty()
  quantity: number

  @ApiProperty()
  status: PaymentStatusTypesEnum

  @ApiPropertyOptional()
  scheduleId?: string

  @ApiPropertyOptional()
  studentId?: string
}
