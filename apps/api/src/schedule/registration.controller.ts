import { Controller, Get, Post, Body, Param, Delete, NotFoundException, HttpCode } from '@nestjs/common'

import { ScheduleService } from './schedule.service'
import { CreateRegistrationDto } from './dto/create-registration.dto'
import { RegistrationService } from './registration.service'
import { Role } from '@lesson-scheduler/shared'
import { Roles } from 'iam/authentication/decorators/roles.decorator'

@Controller('schedules')
export class RegistrationController {
  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly registrationService: RegistrationService,
  ) {}

  @Roles(Role.Admin)
  @Post(':id/registrations')
  create(@Param('id') id: string, @Body() createRegistrationDto: CreateRegistrationDto) {
    return this.registrationService.create(id, createRegistrationDto)
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
  @HttpCode(204)
  async remove(@Param('id') id: string, @Param('studentId') studentId: string) {
    // TODO make sure the student belongs to the user or the user is an admin
    const schedule = await this.scheduleService.findOne(id)
    if (!schedule) {
      throw new NotFoundException()
    }
    return this.registrationService.remove(id, studentId)
  }
}
