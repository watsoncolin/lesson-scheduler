import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { PaymentGatewayTypesEnum } from '../enums/payment-gateway-types.enum'
import { PaymentStatusTypesEnum } from '../enums/payment-status-types.enum'

export class CreatePaymentDto {
  @IsString()
  userId!: string

  @IsString()
  productId!: string

  @IsNumber()
  quantity!: number

  @IsEnum(PaymentGatewayTypesEnum)
  paymentGateway!: PaymentGatewayTypesEnum

  @IsString()
  paymentGatewayId!: string

  @IsEnum(PaymentStatusTypesEnum)
  status: PaymentStatusTypesEnum = PaymentStatusTypesEnum.PENDING

  @IsString()
  @IsOptional()
  scheduleId?: string

  @IsString()
  @IsOptional()
  studentId?: string
}

export class CreatePaypalOrderDto {
  @IsString()
  userId!: string

  @IsString()
  productId!: string

  @IsNumber()
  quantity!: number

  @IsString()
  @IsOptional()
  scheduleId?: string

  @IsString()
  @IsOptional()
  studentId?: string
}
