import { SiteConfigService as GeneratedSiteConfigService } from '@/api/services/SiteConfigService'
import { BaseService, WithConfig } from './baseService'

@WithConfig()
export class ConfigService extends BaseService {
  static async findOne() {
    return GeneratedSiteConfigService.siteConfigControllerFindOne()
  }
}
