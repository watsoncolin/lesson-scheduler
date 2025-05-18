import { ApiProperty } from '@nestjs/swagger'
import { CreditTypesEnum } from 'shared/credit-types.enum'
import { TransactionTypesEnum } from 'shared/transaction-types.enum'
import { IsOptional } from 'class-validator'

export class TransactionResponseDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  userId: string

  @ApiProperty({ required: false })
  productId?: string

  @ApiProperty({ required: false })
  scheduleId?: string

  @ApiProperty({ enum: TransactionTypesEnum })
  transactionType: TransactionTypesEnum

  @ApiProperty({ enum: CreditTypesEnum })
  creditType: CreditTypesEnum

  @ApiProperty({ required: false, type: Number })
  @IsOptional()
  amount?: number

  @ApiProperty()
  credits: number

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  @ApiProperty({ required: false })
  studentId?: string
}
