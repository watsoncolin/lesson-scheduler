import { Controller, Get, Post, Body, Patch, Param, Delete, Req, NotFoundException } from '@nestjs/common'
import { WaitlistService } from './waitlist.service'
import { ActiveUser } from 'iam/authentication/decorators/active-user.decorator'
import { ActiveUserData } from 'iam/authentication/interfaces/active-user-data.interface'
import { Role } from '../../../../libs/shared/src/enums/role.enum'
import { Roles } from 'iam/authentication/decorators/roles.decorator'

@Controller('waitlist')
export class WaitlistController {
  constructor(private readonly waitlistService: WaitlistService) {}

  @Get('')
  async findAll() {
    const waitlist = await this.waitlistService.findAll()
    return waitlist
  }

  @Get('me')
  async me(@ActiveUser() user: ActiveUserData) {
    const waitlist = await this.waitlistService.findByUserId(user.sub)
    return waitlist
  }

  @Post('join')
  join(@ActiveUser() user: ActiveUserData) {
    return this.waitlistService.join(user.sub)
  }

  // TODO add role guard
  @Roles(Role.Admin)
  @Patch(':userId/allow-purchase')
  async update(@Param('userId') userId: string) {
    const waitlist = await this.waitlistService.allowPurchase(userId)
    if (!waitlist) {
      throw new NotFoundException()
    }
    return waitlist
  }
}
