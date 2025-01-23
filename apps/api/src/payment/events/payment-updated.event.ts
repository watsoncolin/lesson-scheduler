import { Payment } from 'payment/payment'

export class PaymentUpdatedEvent {
  constructor(public readonly payment: Payment) {}
}
