import { StatsService as GeneratedStatsService } from '@/api/services/StatsService'
import { BaseService, WithConfig } from './baseService'

@WithConfig()
export class StatsService extends BaseService {
  static async findAll() {
    return GeneratedStatsService.statsControllerFindAll()
  }

  static async findInstructorStats(instructorId: string) {
    return GeneratedStatsService.statsControllerFindInstructorStats(instructorId)
  }
}
