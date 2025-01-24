import { Injectable } from '@nestjs/common'
import { Saga, ICommand, ofType } from '@nestjs/cqrs'
import { Observable, map, mergeMap } from 'rxjs'
import { RemoveUserFromWaitlistCommand } from './commands/remove-user-from-waitlist/remove-user-from-waitlist.command'
import { PaymentCreatedEvent } from 'payment/events/payment-created.event'
import { PaymentUpdatedEvent } from 'payment/events/payment-updated.event'

@Injectable()
export class PaymentSaga {
  @Saga()
  onPaymentCreatedEvent = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentCreatedEvent),
      map(event => new RemoveUserFromWaitlistCommand(event.payment)),
    )
  }
  @Saga()
  onPaymentUpdatedEvent = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PaymentUpdatedEvent),
      map(event => new RemoveUserFromWaitlistCommand(event.payment)),
    )
  }
}
