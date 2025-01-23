import { Controller, Get, Post, Body, Patch, Param, Delete, Req, NotFoundException } from '@nestjs/common'

import { ScheduleService } from './schedule.service'
import { CreateRegistrationDto } from './dto/create-registration.dto'
import { RegistrationService } from './registration.service'

@Controller('schedules')
export class RegistrationController {
  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly registrationService: RegistrationService,
  ) {}

  @Post(':id/registrations')
  create(@Param('id') id: string, @Body() createRegistrationDto: CreateRegistrationDto) {
    // todo add transactionId
    return this.registrationService.create(id, '', createRegistrationDto)
  }

  @Get(':id/registrations')
  async findOne(@Param('id') id: string) {
    const schedule = await this.scheduleService.findOne(id)
    if (!schedule) {
      throw new NotFoundException()
    }
    return schedule.registrations
  }

  // TODO add role guard
  @Delete(':id/registrations/:studentId')
  async remove(@Param('id') id: string, @Param('studentId') studentId: string) {
    const schedule = await this.scheduleService.findOne(id)
    if (!schedule) {
      throw new NotFoundException()
    }
    return this.registrationService.remove(id, studentId)
  }
}
