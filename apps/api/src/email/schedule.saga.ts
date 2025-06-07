import { Injectable } from '@nestjs/common'
import { Saga, ICommand, ofType } from '@nestjs/cqrs'
import { Observable, filter, map, mergeMap } from 'rxjs'
import { RegistrationCanceledEvent, RegistrationCreatedEvent } from 'schedule/events'
import { SendCancellationEmailCommand } from './commands/send-cancellation-email/send-cancellation-email.command'
import { SendReservationEmailCommand } from './commands/send-reservation-email/send-reservation-email.command'

@Injectable()
export class ScheduleSaga {
  @Saga()
  onRegistrationCanceledEvent = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(RegistrationCanceledEvent),
      map(event => new SendCancellationEmailCommand(event.userId, event.scheduleId, event.studentId)),
    )
  }

  @Saga()
  onRegistrationCreatedEvent = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(RegistrationCreatedEvent),
      map(event => new SendReservationEmailCommand(event.userId, event.scheduleId, event.studentId)),
    )
  }
}
