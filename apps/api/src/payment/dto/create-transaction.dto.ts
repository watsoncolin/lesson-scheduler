import { CreditTypesEnum } from 'shared/credit-types.enum'
import { TransactionTypesEnum } from 'shared/transaction-types.enum'

export class CreateTransactionDto {
  userId: string
  productId: string
  transactionType: TransactionTypesEnum
  creditType: CreditTypesEnum
  amount: number
  credits: number
  paymentId?: string
}
