import { Injectable } from '@nestjs/common'
import { Saga, ICommand, ofType } from '@nestjs/cqrs'
import { TransactionCreatedEvent } from 'payment/events'
import { Observable, map } from 'rxjs'
import { CreateReservationFromTransactionCommand } from './commands/create-reservation-from-transaction/create-reservation-from-transaction.command'

@Injectable()
export class TransactionsSaga {
  @Saga()
  onTransactionCreatedEvent = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(TransactionCreatedEvent),
      map(event => new CreateReservationFromTransactionCommand(event.transaction)),
    )
  }
}
