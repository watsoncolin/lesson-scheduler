import { Module } from '@nestjs/common'
import { EmailService } from './email.service'
import { UserModule } from '../user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ConfigEnum } from '../shared/config.enum'
import { LoggerModule } from '../logger/logger.module'
import { CqrsModule } from '@nestjs/cqrs'
import { SendCancellationEmailHandler } from './commands/send-cancellation-email/send-cancellation-email.handler'
import { SendWelcomeEmailHandler } from './commands/send-welcome-email/send-welcome-email.handler'
import { ScheduleSaga } from './schedule.saga'
import { UserSaga } from './user.saga'
import { StudentModule } from 'student/student.module'
import { ScheduleModule } from 'schedule/schedule.module'
const COMMAND_HANDLERS = [SendCancellationEmailHandler, SendWelcomeEmailHandler]
const SAGAS = [UserSaga, ScheduleSaga]

@Module({
  imports: [
    CqrsModule,
    LoggerModule,
    UserModule,
    ConfigModule,
    StudentModule,
    ScheduleModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(ConfigEnum.JwtAccessTokenSecret),
        signOptions: {
          expiresIn: configService.get(ConfigEnum.JwtAccessTokenExpirationTime),
        },
      }),
    }),
  ],
  controllers: [],
  providers: [EmailService, ...COMMAND_HANDLERS, ...SAGAS],
  exports: [EmailService],
})
export class EmailModule {}
