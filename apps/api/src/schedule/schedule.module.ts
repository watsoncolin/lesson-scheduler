import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ScheduleEntity, ScheduleSchema } from './entities/schedule.entity'
import { ScheduleController } from './schedule.controller'
import { ScheduleService } from './schedule.service'
import { RegistrationController } from './registration.controller'
import { RegistrationService } from './registration.service'
import { PaymentModule } from 'payment/payment.module'
import { CreateReservationFromTransactionHandler } from './commands/create-reservation-from-transaction/create-reservation-from-transaction.handler'
import { ProductModule } from 'product/product.module'
import { TransactionsSaga } from './transactions.saga'
import { UserModule } from 'user/user.module'
import { StudentModule } from 'student/student.module'
import { CqrsModule } from '@nestjs/cqrs'
@Module({
  imports: [
    PaymentModule,
    ProductModule,
    MongooseModule.forFeature([{ name: ScheduleEntity.name, schema: ScheduleSchema }]),
    UserModule,
    StudentModule,
    CqrsModule,
  ],
  controllers: [ScheduleController, RegistrationController],
  providers: [ScheduleService, RegistrationService, CreateReservationFromTransactionHandler, TransactionsSaga],
  exports: [ScheduleService, RegistrationService],
})
export class ScheduleModule {}
