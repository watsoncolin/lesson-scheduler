import { Module } from '@nestjs/common'
import { EmailService } from './email.service'
import { UserModule } from '../user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ConfigEnum } from '../shared/config.enum'
import { LoggerModule } from '../logger/logger.module'

@Module({
  imports: [
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
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
