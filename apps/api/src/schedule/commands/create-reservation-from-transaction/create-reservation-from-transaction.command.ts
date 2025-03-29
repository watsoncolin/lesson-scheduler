import { Command } from '@nestjs/cqrs'
import { Transaction } from 'payment/transaction'

export class CreateReservationFromTransactionCommand extends Command<void> {
  constructor(public readonly transaction: Transaction) {
    super()
  }
}
