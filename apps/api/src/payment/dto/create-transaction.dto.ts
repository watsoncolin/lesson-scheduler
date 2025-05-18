import { ApiProperty } from '@nestjs/swagger'
import { CreditTypesEnum } from 'shared/credit-types.enum'
import { TransactionTypesEnum } from 'shared/transaction-types.enum'
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateTransactionDto {
  @ApiProperty()
  @IsString()
  userId: string

  @ApiProperty({ required: false })
  @IsOptional()
  productId?: string

  @ApiProperty({ required: false })
  @IsOptional()
  scheduleId?: string

  @ApiProperty({ enum: TransactionTypesEnum })
  @IsEnum(TransactionTypesEnum)
  transactionType: TransactionTypesEnum

  @ApiProperty({ enum: CreditTypesEnum })
  @IsEnum(CreditTypesEnum)
  creditType: CreditTypesEnum

  @ApiProperty()
  @IsNumber()
  credits: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  amount?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  paymentId?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  studentId?: string
}
