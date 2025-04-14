import { CreditTypesEnum } from '../enums/credit-types.enum'
import { TransactionTypesEnum } from '../enums/transaction-types.enum'

export interface ITransaction {
  id: string
  userId: string
  productId?: string
  scheduleId?: string
  transactionType: TransactionTypesEnum
  creditType: CreditTypesEnum
  credits: number
  amount?: number
  paymentId?: string
  studentId?: string
  createdAt: Date
  updatedAt: Date
}
