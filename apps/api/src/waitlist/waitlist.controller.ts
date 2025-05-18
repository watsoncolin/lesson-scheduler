import { Controller, Get, Post, Body, Patch, Param, Delete, Req, NotFoundException } from '@nestjs/common'
import { WaitlistService } from './waitlist.service'
import { ActiveUser } from 'iam/authentication/decorators/active-user.decorator'
import { ActiveUserData } from 'iam/authentication/interfaces/active-user-data.interface'
import { Roles } from 'iam/authentication/decorators/roles.decorator'
import { ApiTags, ApiOperation, ApiOkResponse, ApiParam } from '@nestjs/swagger'
import { WaitlistResponseDto } from './dto/waitlist-response.dto'
import { Role } from 'iam/role.enum'

@ApiTags('waitlist')
@Controller('waitlist')
export class WaitlistController {
  constructor(private readonly waitlistService: WaitlistService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all waitlist entries' })
  @ApiOkResponse({ type: WaitlistResponseDto, isArray: true })
  async findAll() {
    const waitlist = await this.waitlistService.findAll()
    return waitlist
  }

  @Get('me')
  @ApiOperation({ summary: 'Get waitlist entry for current user' })
  @ApiOkResponse({ type: WaitlistResponseDto })
  async me(@ActiveUser() user: ActiveUserData) {
    const waitlist = await this.waitlistService.findByUserId(user.sub)
    return waitlist
  }

  @Post('join')
  @ApiOperation({ summary: 'Join the waitlist as the current user' })
  @ApiOkResponse({ type: WaitlistResponseDto })
  join(@ActiveUser() user: ActiveUserData) {
    return this.waitlistService.join(user.sub)
  }

  @Roles(Role.Admin)
  @Patch(':userId/allow-purchase')
  @ApiOperation({ summary: 'Allow a user to purchase from the waitlist' })
  @ApiParam({ name: 'userId', type: String })
  @ApiOkResponse({ type: WaitlistResponseDto })
  async update(@Param('userId') userId: string) {
    const waitlist = await this.waitlistService.allowPurchase(userId)
    if (!waitlist) {
      throw new NotFoundException()
    }
    return waitlist
  }
}
