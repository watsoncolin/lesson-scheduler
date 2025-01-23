import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PaymentEntity, PaymentSchema } from './entities/payment.entity'
import { TransactionEntity, TransactionSchema } from './entities/transaction.entity'
import { TransactionService } from './transaction.service'
import { PaymentService } from './payment.service'
import { PaymentController } from './payment.controller'
import { CreateTransactionHandler } from './commands/create-transaction/create-transaction.handler'
import { PaymentSaga } from './payment.saga'
import { CqrsModule } from '@nestjs/cqrs'
import { ProductModule } from 'product/product.module'

@Module({
  imports: [
    ProductModule,
    CqrsModule,
    MongooseModule.forFeature([
      { name: PaymentEntity.name, schema: PaymentSchema },
      { name: TransactionEntity.name, schema: TransactionSchema },
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, TransactionService, CreateTransactionHandler, PaymentSaga],
})
export class PaymentModule {}
