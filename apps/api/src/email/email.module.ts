import { Module } from '@nestjs/common'
import { EmailService } from './email.service'
import { UserModule } from '../user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ConfigEnum } from '../shared/config.enum'
import { LoggerModule } from '../logger/logger.module'
import { CqrsModule } from '@nestjs/cqrs'
import { SendWelcomeEmailHandler } from './commands/send-welcome-email.handler'
import { UserSaga } from './user.saga'
const COMMAND_HANDLERS = [SendWelcomeEmailHandler]
const SAGAS = [UserSaga]

@Module({
  imports: [
    CqrsModule,
    LoggerModule,
    UserModule,
    ConfigModule,
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
