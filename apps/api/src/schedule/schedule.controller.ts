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
import { Auth } from 'iam/authentication/decorators/auth.decorator'
import { AuthType } from 'iam/authentication/enums/auth-type.enum'
import { Role } from '@lesson-scheduler/shared'
import { Roles } from 'iam/authentication/decorators/roles.decorator'
@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get('')
  @Roles(Role.Admin)
  async findAll(@Query() query: { scheduleIds?: string }) {
    const scheduleIds = query.scheduleIds?.split(',').filter(id => id.length > 0)
    if (query.scheduleIds && scheduleIds?.length === 0) {
      return []
    }
    const schedules = await this.scheduleService.findAll(scheduleIds)
    return schedules
  }

  @Get('parent-tot')
  @Auth(AuthType.None)
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
    const { pools, instructors, daysOfWeek, date, timezone } = query
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
    const schedules = await this.scheduleService.search(pools, instructors, daysOfWeekInt, date, timezone)
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

  @Delete(':id')
  @HttpCode(204)
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    const schedule = await this.scheduleService.findOne(id)
    if (!schedule) {
      throw new NotFoundException()
    }
    return this.scheduleService.remove(id)
  }
}
