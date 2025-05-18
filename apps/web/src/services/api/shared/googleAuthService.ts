import { BaseService, WithConfig } from './baseService'
import { GoogleAuthenticationService } from '@/api'

@WithConfig()
export class GoogleAuthService extends BaseService {
  static async authenticate(token: string) {
    return GoogleAuthenticationService.googleAuthenticationControllerAuthenticate({ token })
  }
}
