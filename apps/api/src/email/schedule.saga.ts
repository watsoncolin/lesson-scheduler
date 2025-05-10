import { Injectable } from '@nestjs/common'
import { Saga, ICommand, ofType } from '@nestjs/cqrs'
import { Observable, filter, map, mergeMap } from 'rxjs'
import { RegistrationCanceledEvent } from 'schedule/events'
import { SendCancellationEmailCommand } from './commands/send-cancellation-email/send-cancellation-email.command'

@Injectable()
export class ScheduleSaga {
  @Saga()
  onRegistrationCanceledEvent = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(RegistrationCanceledEvent),
      map(event => new SendCancellationEmailCommand(event.userId, event.scheduleId, event.studentId)),
    )
  }
}
