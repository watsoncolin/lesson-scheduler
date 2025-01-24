import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { PaymentStatusTypesEnum } from 'shared/payment-status-types.enum'
import { RemoveUserFromWaitlistCommand } from './remove-user-from-waitlist.command'
import { WaitlistService } from 'waitlist/waitlist.service'

@CommandHandler(RemoveUserFromWaitlistCommand)
export class RemoveUserFromWaitlistHandler implements ICommandHandler<RemoveUserFromWaitlistCommand> {
  constructor(private readonly waitlistService: WaitlistService) {}

  async execute(command: RemoveUserFromWaitlistCommand): Promise<void> {
    if (command.payment.status === PaymentStatusTypesEnum.FAILED) {
      return
    }

    const waitlist = await this.waitlistService.findByUserId(command.payment.userId)
    if (!waitlist) {
      return
    }
    await this.waitlistService.remove(waitlist.id)
  }
}
