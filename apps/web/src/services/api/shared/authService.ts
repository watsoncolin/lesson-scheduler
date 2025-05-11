import { BaseService } from './baseService'
import { AuthenticationService, SignInDto, SignUpDto, RefreshTokenDto } from '@/api'

// Configure OpenAPI once when the service is initialized
BaseService.configure()

export class AuthService extends BaseService {
  static async signUp(data: SignUpDto) {
    return AuthenticationService.authenticationControllerSignUp(data)
  }

  static async signIn(data: SignInDto) {
    return AuthenticationService.authenticationControllerSignIn(data)
  }

  static async refreshTokens(data: RefreshTokenDto) {
    return AuthenticationService.authenticationControllerRefreshTokens(data)
  }

  static async logout() {
    return AuthenticationService.authenticationControllerLogout()
  }

  static async forgotPassword() {
    return AuthenticationService.authenticationControllerForgotPassword()
  }

  static async resetPassword() {
    return AuthenticationService.authenticationControllerResetPassword()
  }
}
