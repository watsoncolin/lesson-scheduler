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

import { ActiveUser } from 'iam/authentication/decorators/active-user.decorator'
import { ActiveUserData } from 'iam/authentication/interfaces/active-user-data.interface'
import { Auth } from 'iam/authentication/decorators/auth.decorator'
import { AuthType } from 'iam/authentication/enums/auth-type.enum'
import { Role, ScheduleDto } from '@lesson-scheduler/shared'
import { Roles } from 'iam/authentication/decorators/roles.decorator'
import { StatsService } from './stats.service'
import { StatsResponseDto } from './dto/stats-response.dto'
import { ApiResponse } from '@nestjs/swagger'

@Controller('stats')
@Roles(Role.Admin, Role.Instructor)
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('instructor/:instructorId')
  @ApiResponse({
    status: 200,
    description: 'The stats for the instructor',
    type: StatsResponseDto,
  })
  async findInstructorStats(@Param('instructorId') instructorId: string): Promise<StatsResponseDto> {
    const stats = await this.statsService.getInstructorStats(instructorId)
    return {
      privateLessons: stats.purchaseCounts.privateLessons,
      groupLessons: stats.purchaseCounts.groupLessons,
      availableLessons: stats.lessonCounts.available,
      scheduledLessons: stats.lessonCounts.scheduled,
      unscheduledPrivateLessons: stats.lessonCounts.unscheduledPrivate,
      unscheduledGroupLessons: stats.lessonCounts.unscheduledGroup,
      activeUsers: stats.userCounts.active,
    }
  }

  @Get('')
  @ApiResponse({
    status: 200,
    description: 'The stats for the site',
    type: StatsResponseDto,
  })
  async findAll(): Promise<StatsResponseDto> {
    const stats = await this.statsService.getStats()
    return {
      privateLessons: stats.purchaseCounts.privateLessons,
      groupLessons: stats.purchaseCounts.groupLessons,
      availableLessons: stats.lessonCounts.available,
      scheduledLessons: stats.lessonCounts.scheduled,
      unscheduledPrivateLessons: stats.lessonCounts.unscheduledPrivate,
      unscheduledGroupLessons: stats.lessonCounts.unscheduledGroup,
      activeUsers: stats.userCounts.active,
    }
  }
}
