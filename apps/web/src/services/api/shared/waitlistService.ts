import { WaitlistService as GeneratedWaitlistService } from '@/api/services/WaitlistService'
import { BaseService, WithConfig } from './baseService'

@WithConfig()
export class WaitlistService extends BaseService {
  static async me() {
    return GeneratedWaitlistService.waitlistControllerMe()
  }

  static async join() {
    return GeneratedWaitlistService.waitlistControllerJoin()
  }
}
