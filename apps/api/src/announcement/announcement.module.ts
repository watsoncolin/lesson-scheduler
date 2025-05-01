import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AnnouncementEntity, AnnouncementSchema } from './entities/announcement.entity'
import { AnnouncementService } from './announcement.service'
import { AnnouncementController } from './announcement.controller'

@Module({
  imports: [MongooseModule.forFeature([{ name: AnnouncementEntity.name, schema: AnnouncementSchema }])],
  controllers: [AnnouncementController],
  providers: [AnnouncementService],
  exports: [AnnouncementService],
})
export class AnnouncementModule {}
