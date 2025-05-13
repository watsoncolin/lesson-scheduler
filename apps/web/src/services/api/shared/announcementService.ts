import { AnnouncementService as GeneratedAnnouncementService } from '@/api/services/AnnouncementService'
import type { CreateAnnouncementDto } from '@/api'
import type { Announcement } from '@lesson-scheduler/shared'
import { BaseService, WithConfig } from './baseService'

@WithConfig()
export class AnnouncementService extends BaseService {
  static async findOne(): Promise<Announcement | null> {
    return GeneratedAnnouncementService.announcementControllerFindOne()
  }

  static async create(data: CreateAnnouncementDto): Promise<Announcement> {
    return GeneratedAnnouncementService.announcementControllerCreate(data)
  }
}
