import { Controller, Get, Post, Body, NotFoundException } from '@nestjs/common'
import { AnnouncementService } from './announcement.service'
import { Role } from '../../../../libs/shared/src/enums/role.enum'
import { Roles } from 'iam/authentication/decorators/roles.decorator'
import { CreateAnnouncementDto } from '@lesson-scheduler/shared'

@Controller('announcement')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() announcement: CreateAnnouncementDto) {
    return this.announcementService.create(announcement)
  }

  @Get()
  async findOne() {
    const announcement = await this.announcementService.findOne()
    if (!announcement) {
      throw new NotFoundException('Announcement not found')
    }
    return announcement
  }
}
