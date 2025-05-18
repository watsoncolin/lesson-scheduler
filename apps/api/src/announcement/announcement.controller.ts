import { Controller, Get, Post, Body, NotFoundException } from '@nestjs/common'
import { AnnouncementService } from './announcement.service'
import { Role } from 'iam/role.enum'
import { Roles } from 'iam/authentication/decorators/roles.decorator'
import { Auth } from 'iam/authentication/decorators/auth.decorator'
import { AuthType } from 'iam/authentication/enums/auth-type.enum'
import { CreateAnnouncementDto } from './dto/create-announcement.dto'

@Controller('announcement')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() announcement: CreateAnnouncementDto) {
    return this.announcementService.create(announcement)
  }

  @Get()
  @Auth(AuthType.None)
  async findOne() {
    const announcement = await this.announcementService.findOne()
    if (!announcement) {
      throw new NotFoundException('Announcement not found')
    }
    return announcement
  }
}
