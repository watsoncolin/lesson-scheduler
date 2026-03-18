import { Controller, Get, Post, Body, Param, Delete, NotFoundException, HttpCode, ForbiddenException } from '@nestjs/common'

import { ScheduleService } from './schedule.service'
import { CreateRegistrationDto } from './dto/create-registration.dto'
import { RegistrationService } from './registration.service'
import { ActiveUser } from 'iam/authentication/decorators/active-user.decorator'
import { ActiveUserData } from 'iam/authentication/interfaces/active-user-data.interface'
import { StudentService } from 'student/student.service'
import { Role } from '@lesson-scheduler/shared'

@Controller('schedules')
export class RegistrationController {
  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly registrationService: RegistrationService,
    private readonly studentService: StudentService,
  ) {}

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

  @Delete(':id/registrations/:studentId')
  @HttpCode(204)
  async remove(@Param('id') id: string, @Param('studentId') studentId: string, @ActiveUser() user: ActiveUserData) {
    const schedule = await this.scheduleService.findOne(id)
    if (!schedule) {
      throw new NotFoundException()
    }

    if (user.role !== Role.Admin) {
      const student = await this.studentService.findOne(studentId)
      if (!student || student.userId.toString() !== user.sub) {
        throw new ForbiddenException()
      }
    }

    return this.registrationService.remove(id, studentId)
  }
}
