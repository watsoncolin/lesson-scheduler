import { PartialType } from '@nestjs/mapped-types'
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { LessonTypesEnum } from 'shared/lesson-types.enum'
import { CreatePaymentDto } from './create-payment.dto'
import { PaymentStatusTypesEnum } from 'shared/payment-status-types.enum'

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  id: string
  @IsOptional()
  @IsString()
  paymentGatewayId?: string
  @IsOptional()
  @IsString()
  status?: PaymentStatusTypesEnum
}
