import { CreditTypesEnum } from 'shared/credit-types.enum'
import { TransactionTypesEnum } from 'shared/transaction-types.enum'

export class CreateTransactionDto {
  userId: string
  productId?: string
  scheduleId?: string
  transactionType: TransactionTypesEnum
  creditType: CreditTypesEnum
  credits: number
  amount?: number
  paymentId?: string
}
