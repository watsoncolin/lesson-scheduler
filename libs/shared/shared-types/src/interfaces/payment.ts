import { PaymentGatewayTypesEnum } from '../enums/payment-gateway-types.enum'
import { PaymentStatusTypesEnum } from '../enums/payment-status-types.enum'

export interface IPayment {
  id: string
  userId: string
  productId: string
  quantity: number
  paymentGateway: PaymentGatewayTypesEnum
  paymentGatewayId: string
  status: PaymentStatusTypesEnum
  amount: number
  scheduleId?: string
  studentId?: string
  createdAt: Date
  updatedAt: Date
}
