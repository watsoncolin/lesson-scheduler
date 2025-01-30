import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  NotFoundException,
  HttpCode,
  Query,
} from '@nestjs/common'

import { ScheduleService } from './schedule.service'
import { CreateScheduleDto } from './dto/create-schedule.dto'
import { UpdateScheduleDto } from './dto/update-schedule.dto'
import { SearchScheduleDto } from './dto/search-schedule.dto'
import { ActiveUser } from 'iam/authentication/decorators/active-user.decorator'
import { ActiveUserData } from 'iam/authentication/interfaces/active-user-data.interface'

@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get('')
  async findAll(@Query() query: { scheduleIds?: string }) {
    const scheduleIds = query.scheduleIds?.split(',').filter(id => id.length > 0)
    if (query.scheduleIds && scheduleIds?.length === 0) {
      return []
    }
    const schedules = await this.scheduleService.findAll(scheduleIds)
    return schedules
  }

  @Get('parent-tot')
  async findAllParentTot() {
    const schedules = await this.scheduleService.findAllParentTot()
    return schedules.map(schedule => ({
      ...schedule,
      registrations: undefined,
      spotsAvailable: schedule.classSize - schedule.registrations.length,
    }))
  }

  @Get('me')
  async findAllForLoggedInUser(@ActiveUser() user: ActiveUserData) {
    const schedules = await this.scheduleService.findAllByUserId(user.sub)
    return schedules
  }

  @Get('search')
  async search(@Query() query: SearchScheduleDto) {
    const { pools, instructors, daysOfWeek, date } = query
    const daysOfWeekInt = daysOfWeek
      ?.map(day => {
        switch (day.toLowerCase()) {
          case 'sunday':
            return 1
          case 'monday':
            return 2
          case 'tuesday':
            return 3
          case 'wednesday':
            return 4
          case 'thursday':
            return 5
          case 'friday':
            return 6
          case 'saturday':
            return 7
          default:
            return null
        }
      })
      .filter(d => d != null)
    const schedules = await this.scheduleService.search(pools, instructors, daysOfWeekInt, date)
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
