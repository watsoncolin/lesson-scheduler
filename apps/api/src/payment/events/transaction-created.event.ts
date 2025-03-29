import { Transaction } from 'payment/transaction'

export class TransactionCreatedEvent {
  constructor(public readonly transaction: Transaction) {}
}
