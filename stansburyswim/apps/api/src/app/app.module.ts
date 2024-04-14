import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { IamModule } from '../iam/iam.module'

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27019/stansburyswim'), IamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
