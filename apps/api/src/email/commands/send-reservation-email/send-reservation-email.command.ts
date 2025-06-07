import { Command } from '@nestjs/cqrs'
import { User } from 'user/user'

export class SendReservationEmailCommand extends Command<void> {
  constructor(
    public readonly userId: string,
    public readonly scheduleId: string,
    public readonly studentId: string,
  ) {
    super()
  }
}
