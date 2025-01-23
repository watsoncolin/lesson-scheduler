import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { LessonTypesEnum } from 'shared/lesson-types.enum'
import { PaymentGatewayTypesEnum } from 'shared/payment-gateway-types.enum'
import { PaymentStatusTypesEnum } from 'shared/payment-status-types.enum'

export class CreatePaymentDto {
  @IsString()
  userId: string
  @IsString()
  productId: string
  @IsEnum(PaymentGatewayTypesEnum)
  paymentGateway: PaymentGatewayTypesEnum
  @IsString()
  paymentGatewayId: string
  @IsEnum(PaymentStatusTypesEnum)
  status: PaymentStatusTypesEnum = PaymentStatusTypesEnum.PENDING
}
