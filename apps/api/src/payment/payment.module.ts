import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PaymentEntity, PaymentSchema } from './entities/payment.entity'
import { TransactionEntity, TransactionSchema } from './entities/transaction.entity'
import { TransactionService } from './transaction.service'
import { PaymentService } from './payment.service'
import { PaymentController } from './payment.controller'
import { PaymentSaga } from './payment.saga'
import { CqrsModule } from '@nestjs/cqrs'
import { ProductModule } from 'product/product.module'
import { CreateTransactionFromPaymentHandler } from './commands/create-transaction-from-payment/create-transaction-from-payment.handler'
import { SiteConfigModule } from 'site-config/site-config.module'
import { WaitlistModule } from 'waitlist/waitlist.module'
import { TransactionsController } from './transactions.controller'

@Module({
  imports: [
    ProductModule,
    SiteConfigModule,
    WaitlistModule,
    CqrsModule,
    MongooseModule.forFeature([
      { name: PaymentEntity.name, schema: PaymentSchema },
      { name: TransactionEntity.name, schema: TransactionSchema },
    ]),
  ],
  controllers: [PaymentController, TransactionsController],
  providers: [PaymentService, TransactionService, CreateTransactionFromPaymentHandler, PaymentSaga],
  exports: [TransactionService],
})
export class PaymentModule {}
