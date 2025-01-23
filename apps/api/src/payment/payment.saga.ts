import { Injectable } from '@nestjs/common'
import { Saga, ICommand, ofType } from '@nestjs/cqrs'
import { Observable, map } from 'rxjs'
import { PaymentCreatedEvent } from './events/payment-created.event'
import { PaymentUpdatedEvent } from './events/payment-updated.event'
import { CreateTransactionFromPaymentCommand } from './commands/create-transaction-from-payment/create-transaction-from-payment.command'

@Injectable()
export class PaymentSaga {
  @Saga()
  onPaymentCreatedEvent = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentCreatedEvent),
      map(event => new CreateTransactionFromPaymentCommand(event.payment)),
    )
  }
  @Saga()
  onPaymentUpdatedEvent = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentUpdatedEvent),
      map(event => new CreateTransactionFromPaymentCommand(event.payment)),
    )
  }
}
