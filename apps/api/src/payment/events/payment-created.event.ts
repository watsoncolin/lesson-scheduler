import { Payment } from 'payment/payment'

export class PaymentCreatedEvent {
  constructor(public readonly payment: Payment) {}
}
