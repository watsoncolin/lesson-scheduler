import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { PaymentStatusTypesEnum } from 'shared/payment-status-types.enum'
import { TransactionService } from 'payment/transaction.service'
import { CreateTransactionDto } from 'payment/dto/create-transaction.dto'
import { ProductService } from 'product/product.service'
import { LessonTypesEnum } from 'shared/lesson-types.enum'
import { CreditTypesEnum } from 'shared/credit-types.enum'
import { TransactionTypesEnum } from 'shared/transaction-types.enum'
import { CreateTransactionFromPaymentCommand } from './create-transaction-from-payment.command'

@CommandHandler(CreateTransactionFromPaymentCommand)
export class CreateTransactionFromPaymentHandler implements ICommandHandler<CreateTransactionFromPaymentCommand> {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly productService: ProductService,
  ) {}

  async execute(command: CreateTransactionFromPaymentCommand): Promise<void> {
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
      paymentId: command.payment.id,
    }
    await this.transactionService.create(dto)
  }
}
