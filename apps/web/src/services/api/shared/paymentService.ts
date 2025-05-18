import { PaymentsService as GeneratedPaymentsService } from '@/api/services/PaymentsService'
import type { CreatePaymentDto } from '@/api/models/CreatePaymentDto'
import type { CreatePaypalOrderDto } from '@/api/models/CreatePaypalOrderDto'

import { BaseService, WithConfig } from './baseService'

@WithConfig()
export class PaymentService extends BaseService {
  static async create(data: CreatePaymentDto) {
    return GeneratedPaymentsService.paymentControllerCreate(data)
  }

  static async createPaypalOrder(data: CreatePaypalOrderDto) {
    return GeneratedPaymentsService.paymentControllerCreatePaypalOrder(data)
  }

  static async captureOrder(data: { orderId: string }) {
    return GeneratedPaymentsService.paymentControllerCaptureOrder(data)
  }

  static async validateMerchant(data: { validationUrl: string }) {
    return GeneratedPaymentsService.paymentControllerAppleValidateMerchant(data)
  }
}
