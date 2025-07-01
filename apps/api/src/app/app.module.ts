import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose'
import { IamModule } from '../iam/iam.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { InstructorModule } from 'instructor/instructor.module'
import { StudentModule } from 'student/student.module'
import { UserModule } from 'user/user.module'
import { ConfigEnum } from 'shared/config.enum'
import { PoolModule } from 'pool/pool.module'
import { ProductModule } from 'product/product.module'
import { ScheduleModule } from 'schedule/schedule.module'
import { PaymentModule } from 'payment/payment.module'
import { SiteConfigModule } from 'site-config/site-config.module'
import { WaitlistModule } from 'waitlist/waitlist.module'
import { FileModule } from '../file/file.module'
import { AnnouncementModule } from 'announcement/announcement.module'
import { StatsModule } from 'stats/stats.module'
import { ControllersModule } from 'controllers/controllers.module'
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): MongooseModuleFactoryOptions => {
        const uri = configService.get(ConfigEnum.MongoUri)
        return {
          uri: configService.get(ConfigEnum.MongoUri),
          autoIndex: true,
        }
      },
    }),
    IamModule,
    StudentModule,
    UserModule,
    InstructorModule,
    PoolModule,
    ProductModule,
    ScheduleModule,
    PaymentModule,
    SiteConfigModule,
    WaitlistModule,
    FileModule,
    AnnouncementModule,
    StatsModule,
    ControllersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
