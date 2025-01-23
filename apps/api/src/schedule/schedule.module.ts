import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ScheduleEntity, ScheduleSchema } from './entities/schedule.entity'
import { ScheduleController } from './schedule.controller'
import { ScheduleService } from './schedule.service'
import { RegistrationController } from './registration.controller'
import { RegistrationService } from './registration.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: ScheduleEntity.name, schema: ScheduleSchema }])],
  controllers: [ScheduleController, RegistrationController],
  providers: [ScheduleService, RegistrationService],
})
export class ScheduleModule {}
