import { CreditTypesEnum } from 'shared/credit-types.enum'
import { LessonTypesEnum } from 'shared/lesson-types.enum'
import { TransactionTypesEnum } from 'shared/transaction-types.enum'

export class Transaction {
  id: string
  userId: string
  productId?: string
  scheduleId?: string
  transactionType: TransactionTypesEnum
  creditType: CreditTypesEnum
  amount?: number | undefined
  credits: number
  createdAt: Date
  updatedAt: Date
}
