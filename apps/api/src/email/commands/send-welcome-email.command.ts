import { Command } from '@nestjs/cqrs'
import { User } from 'user/user'

export class SendWelcomeEmailCommand extends Command<void> {
  constructor(public readonly user: User) {
    super()
  }
}
