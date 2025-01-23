import { Injectable } from '@nestjs/common'
import { Saga, ICommand, ofType } from '@nestjs/cqrs'
import { Observable, map } from 'rxjs'
import { PaymentCreatedEvent } from './events/payment-created.event'
import { CreateTransactionCommand } from './commands/create-transaction/create-transaction.command'
import { PaymentUpdatedEvent } from './events/payment-updated.event'

@Injectable()
export class PaymentSaga {
  @Saga()
  onPaymentCreatedEvent = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentCreatedEvent),
      map(event => new CreateTransactionCommand(event.payment)),
    )
  }
  @Saga()
  onPaymentUpdatedEvent = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentUpdatedEvent),
      map(event => new CreateTransactionCommand(event.payment)),
    )
  }
}
