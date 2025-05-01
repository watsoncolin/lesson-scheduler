import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { SendWelcomeEmailCommand } from './send-welcome-email.command'
import { EmailService } from 'email/email.service'
import { Logger } from '@nestjs/common'

@CommandHandler(SendWelcomeEmailCommand)
export class SendWelcomeEmailHandler implements ICommandHandler<SendWelcomeEmailCommand> {
  constructor(
    private readonly emailService: EmailService,
    private readonly logger: Logger,
  ) {}

  async execute(command: SendWelcomeEmailCommand): Promise<void> {
    try {
      await this.handle(command)
    } catch (error) {
      this.logger.error(error)
    }
  }
  async handle(command: SendWelcomeEmailCommand): Promise<void> {
    await this.emailService.sendWelcomeEmail(command.user)
  }
}
