import { Controller, Get, Post } from '@nestjs/common'
import { SiteConfigService } from './site-config.service'

// TODO add role guard
@Controller('config')
export class SiteConfigController {
  constructor(private readonly configService: SiteConfigService) {}

  @Post('waitlist')
  toggleWaitlist() {
    return this.configService.toggleWaitlist()
  }

  @Get()
  findOne() {
    return this.configService.findOne()
  }
}
