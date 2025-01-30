import { IsEnum, IsNumber, IsString } from 'class-validator'

import { PaymentGatewayTypesEnum } from 'shared/payment-gateway-types.enum'
import { PaymentStatusTypesEnum } from 'shared/payment-status-types.enum'

export class CreatePaymentDto {
  @IsString()
  userId: string
  @IsString()
  productId: string
  @IsNumber()
  quantity: number
  @IsEnum(PaymentGatewayTypesEnum)
  paymentGateway: PaymentGatewayTypesEnum
  @IsString()
  paymentGatewayId: string
  @IsEnum(PaymentStatusTypesEnum)
  status: PaymentStatusTypesEnum = PaymentStatusTypesEnum.PENDING
}
