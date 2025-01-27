import { Controller, Get, Post, Body, Patch, Param, Delete, Req, NotFoundException, HttpCode } from '@nestjs/common'

import { ScheduleService } from './schedule.service'
import { CreateScheduleDto } from './dto/create-schedule.dto'
import { UpdateScheduleDto } from './dto/update-schedule.dto'

@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get('')
  async findAll() {
    const schedules = await this.scheduleService.findAll()
    return schedules
  }

  // TODO add role guard
  @Post()
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.create(createScheduleDto)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const schedule = await this.scheduleService.findOne(id)
    if (!schedule) {
      throw new NotFoundException()
    }
    return schedule
  }

  // TODO add role guard
  // TODO decide if we want to update schedules
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateScheduleDto: UpdateScheduleDto) {
    const schedule = await this.scheduleService.findOne(id)
    if (!schedule) {
      throw new NotFoundException()
    }
    if (schedule.registrations.length > 0) {
      throw new Error('Cannot update a schedule that has registrations')
    }
    return this.scheduleService.update({
      ...updateScheduleDto,
      id,
    })
  }

  // TODO add role guard
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const schedule = await this.scheduleService.findOne(id)
    if (!schedule) {
      throw new NotFoundException()
    }
    return this.scheduleService.remove(id)
  }
}
