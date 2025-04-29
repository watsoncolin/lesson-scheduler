import { Controller, Get, Post } from '@nestjs/common'
import { SiteConfigService } from './site-config.service'
import { Role } from '../../../../libs/shared/src/enums/role.enum'
import { Roles } from 'iam/authentication/decorators/roles.decorator'

@Controller('config')
export class SiteConfigController {
  constructor(private readonly configService: SiteConfigService) {}

  @Post('waitlist')
  @Roles(Role.Admin)
  toggleWaitlist() {
    return this.configService.toggleWaitlist()
  }

  @Get()
  findOne() {
    return this.configService.findOne()
  }
}
