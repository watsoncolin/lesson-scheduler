import { PaymentGatewayTypesEnum } from 'shared/payment-gateway-types.enum'
import { PaymentStatusTypesEnum } from 'shared/payment-status-types.enum'

export class Payment {
  id: string
  createdAt: Date
  updatedAt: Date
  userId: string
  productId: string
  paymentGateway: PaymentGatewayTypesEnum
  paymentGatewayId: string
  amount: number
  status: PaymentStatusTypesEnum
  scheduleId?: string
  studentId?: string
}
