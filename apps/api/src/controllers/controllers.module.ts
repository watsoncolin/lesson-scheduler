import { Module } from '@nestjs/common'

import { PaymentController } from 'payment/payment.controller'
import { PaymentModule } from 'payment/payment.module'
import { ScheduleModule } from 'schedule/schedule.module'
import { UserModule } from 'user/user.module'

@Module({
  imports: [PaymentModule, ScheduleModule, UserModule],
  controllers: [PaymentController],
  providers: [],
  exports: [],
})
export class ControllersModule {}
