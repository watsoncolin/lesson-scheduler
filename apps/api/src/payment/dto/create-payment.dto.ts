import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

import { PaymentGatewayTypesEnum } from 'shared/payment-gateway-types.enum'
import { PaymentStatusTypesEnum } from 'shared/payment-status-types.enum'

export class CreatePaymentDto {
  @ApiProperty({ type: String })
  @IsString()
  userId: string
  @ApiProperty({ type: String })
  @IsString()
  productId: string
  @ApiProperty({ type: Number })
  @IsNumber()
  quantity: number
  @ApiProperty({ enum: PaymentGatewayTypesEnum })
  @IsEnum(PaymentGatewayTypesEnum)
  paymentGateway: PaymentGatewayTypesEnum
  @ApiProperty({ type: String })
  @IsString()
  paymentGatewayId: string
  @ApiProperty({ enum: PaymentStatusTypesEnum, default: PaymentStatusTypesEnum.PENDING })
  @IsEnum(PaymentStatusTypesEnum)
  status: PaymentStatusTypesEnum = PaymentStatusTypesEnum.PENDING
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  scheduleId?: string
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  studentId?: string
}
