import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateTransactionCommand } from './create-transaction.command'
import { PaymentStatusTypesEnum } from 'shared/payment-status-types.enum'
import { TransactionService } from 'payment/transaction.service'
import { CreateTransactionDto } from 'payment/dto/create-transaction.dto'
import { ProductService } from 'product/product.service'
import { LessonTypesEnum } from 'shared/lesson-types.enum'
import { CreditTypesEnum } from 'shared/credit-types.enum'
import { TransactionTypesEnum } from 'shared/transaction-types.enum'

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionHandler implements ICommandHandler<CreateTransactionCommand> {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly productService: ProductService,
  ) {}

  async execute(command: CreateTransactionCommand): Promise<void> {
    if (command.payment.status !== PaymentStatusTypesEnum.SUCCESS) {
      return
    }
    const product = await this.productService.findOne(command.payment.productId)

    const dto: CreateTransactionDto = {
      userId: command.payment.userId,
      productId: command.payment.productId,
      amount: command.payment.amount,
      credits: product.credits,
      creditType: product.lessonType == LessonTypesEnum.PRIVATE ? CreditTypesEnum.PRIVATE : CreditTypesEnum.GROUP,
      transactionType: TransactionTypesEnum.PurchaseCredits,
    }
    await this.transactionService.create(dto)
  }
}
