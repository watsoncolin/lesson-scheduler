import { Injectable } from '@nestjs/common'
import { Saga, ICommand, ofType } from '@nestjs/cqrs'
import { Observable, map } from 'rxjs'
import { UserRegisterEvent } from 'user/events/user-register.event'
import { SendWelcomeEmailCommand } from './commands/send-welcome-email/send-welcome-email.command'
@Injectable()
export class UserSaga {
  @Saga()
  onUserRegisterEvent = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserRegisterEvent),
      map(event => new SendWelcomeEmailCommand(event.user)),
    )
  }
}
