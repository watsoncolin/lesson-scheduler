import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { ProductService } from 'product/product.service'
import { LessonTypesEnum } from 'shared/lesson-types.enum'
import { RegistrationService } from 'schedule/registration.service'
import { CreateReservationFromTransactionCommand } from './create-reservation-from-transaction.command'
import { ScheduleService } from 'schedule/schedule.service'

@CommandHandler(CreateReservationFromTransactionCommand)
export class CreateReservationFromTransactionHandler
  implements ICommandHandler<CreateReservationFromTransactionCommand>
{
  constructor(
    private readonly registrationService: RegistrationService,
    private readonly productService: ProductService,
    private readonly scheduleService: ScheduleService,
  ) {}

  async execute(command: CreateReservationFromTransactionCommand): Promise<void> {
    try {
      await this.handleCommand(command)
    } catch (e) {
      console.error(e)
    }
  }
  async handleCommand(command: CreateReservationFromTransactionCommand): Promise<void> {
    if (command.transaction.productId == null) {
      return
    }

    if (command.transaction.scheduleId == null) {
      return
    }

    if (command.transaction.studentId == null) {
      return
    }

    const product = await this.productService.findOne(command.transaction.productId)

    if (product.lessonType != LessonTypesEnum.GROUP) {
      return
    }

    const schedule = await this.scheduleService.findOne(command.transaction.scheduleId)

    if (schedule.registrations.length >= schedule.classSize) {
      throw new Error('Class is full')
    }

    await this.registrationService.create(command.transaction.scheduleId, {
      userId: command.transaction.userId,
      studentId: command.transaction.studentId,
    })
  }
}
