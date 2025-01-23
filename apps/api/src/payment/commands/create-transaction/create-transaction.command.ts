import { Command } from '@nestjs/cqrs'
import { Payment } from 'payment/payment'

export class CreateTransactionCommand extends Command<void> {
  constructor(public readonly payment: Payment) {
    super()
  }
}
