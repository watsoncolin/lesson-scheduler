import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { PaymentStatusTypesEnum } from 'shared/payment-status-types.enum'
import { RemoveUserFromWaitlistCommand } from './remove-user-from-waitlist.command'
import { WaitlistService } from 'waitlist/waitlist.service'
import { SiteConfigService } from 'site-config/site-config.service'

@CommandHandler(RemoveUserFromWaitlistCommand)
export class RemoveUserFromWaitlistHandler implements ICommandHandler<RemoveUserFromWaitlistCommand> {
  constructor(
    private readonly waitlistService: WaitlistService,
    private readonly siteConfigService: SiteConfigService,
  ) {}

  async execute(command: RemoveUserFromWaitlistCommand): Promise<void> {
    try {
      await this.handleCommand(command)
    } catch (e) {
      console.log(e)
    }
  }

  async handleCommand(command: RemoveUserFromWaitlistCommand): Promise<void> {
    if (!(await this.siteConfigService.findOne()).waitlistEnabled) {
      return
    }
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
