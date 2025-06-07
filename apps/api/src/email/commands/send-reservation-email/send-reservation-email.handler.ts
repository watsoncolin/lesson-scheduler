import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { EmailService } from 'email/email.service'
import { Logger } from '@nestjs/common'
import { UserService } from 'user/user.service'
import { StudentService } from 'student/student.service'
import { ScheduleService } from 'schedule/schedule.service'
import { SendReservationEmailCommand } from './send-reservation-email.command'

@CommandHandler(SendReservationEmailCommand)
export class SendReservationEmailHandler implements ICommandHandler<SendReservationEmailCommand> {
  constructor(
    private readonly emailService: EmailService,
    private readonly logger: Logger,
    private readonly userService: UserService,
    private readonly studentService: StudentService,
    private readonly scheduleService: ScheduleService,
  ) {}

  async execute(command: SendReservationEmailCommand): Promise<void> {
    try {
      await this.handle(command)
    } catch (error) {
      this.logger.error(error)
    }
  }
  async handle(command: SendReservationEmailCommand): Promise<void> {
    // Get user, get student, get schedule
    const user = await this.userService.findOne(command.userId)
    const student = await this.studentService.findOne(command.studentId)
    const schedule = await this.scheduleService.findOne(command.scheduleId, true)

    await this.emailService.sendReservationEmail(user, student, schedule)
  }
}
