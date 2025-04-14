import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import { CreditTypesEnum } from '../enums/credit-types.enum'
import { TransactionTypesEnum } from '../enums/transaction-types.enum'

export class CreateTransactionDto {
  @IsString()
  userId!: string

  @IsString()
  @IsOptional()
  productId?: string

  @IsString()
  @IsOptional()
  scheduleId?: string

  @IsEnum(TransactionTypesEnum)
  transactionType!: TransactionTypesEnum

  @IsEnum(CreditTypesEnum)
  creditType!: CreditTypesEnum

  @IsNumber()
  credits!: number

  @IsNumber()
  @IsOptional()
  amount?: number

  @IsString()
  @IsOptional()
  paymentId?: string

  @IsString()
  @IsOptional()
  studentId?: string
}
