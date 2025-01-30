export interface Transaction {
  id: string
  createdAt: string
  productId?: string
  amount: number
  credits: number
  creditType: 'private' | 'group'
  transactionType: 'PURCHASE_CREDITS' | 'REGISTER' | 'CANCEL_REGISTRATION'
  scheduleId?: string
  studentId?: string
}
