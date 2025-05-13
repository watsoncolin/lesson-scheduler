import { Module } from '@nestjs/common'
import { PaymentModule } from 'payment/payment.module'
import { ProductModule } from 'product/product.module'
import { UserModule } from 'user/user.module'
import { StudentModule } from 'student/student.module'
import { CqrsModule } from '@nestjs/cqrs'
import { StatsController } from './stats.controller'
import { StatsService } from './stats.service'
import { ScheduleModule } from 'schedule/schedule.module'

@Module({
  imports: [PaymentModule, ProductModule, UserModule, StudentModule, CqrsModule, ScheduleModule],
  controllers: [StatsController],
  providers: [StatsService],
  exports: [StatsService],
})
export class StatsModule {}
