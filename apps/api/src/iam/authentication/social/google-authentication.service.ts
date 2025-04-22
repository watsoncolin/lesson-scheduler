import { Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { OAuth2Client } from 'google-auth-library'
import { AuthenticationService } from '../authentication.service'
import { UserService } from 'user/user.service'

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthenticationService,
    private readonly userService: UserService,
  ) {}

  onModuleInit() {
    const clientId = this.configService.get('GOOGLE_CLIENT_ID')
    const clientSecret = this.configService.get('GOOGLE_CLIENT_SECRET')
    this.oauthClient = new OAuth2Client(clientId, clientSecret)
  }

  async authenticate(token: string) {
    try {
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: token,
      })
      if (!loginTicket) {
        throw new UnauthorizedException()
      }
      const payload = loginTicket.getPayload()
      if (!payload) {
        throw new UnauthorizedException()
      }
      const { email, sub: googleId, given_name, family_name } = payload

      // First check if user exists with this Google ID
      let user = await this.userService.findOneByGoogleId({ googleId })

      if (user) {
        return this.authService.generateTokens(user)
      }

      if (!email) {
        throw new UnauthorizedException()
      }

      // Check if user exists with this email
      const existingUser = await this.userService.findOneForAuth(email)

      if (existingUser) {
        // Merge accounts by adding Google ID to existing account
        user = await this.userService.addGoogleId(
          email,
          googleId,
          given_name || existingUser.firstName,
          family_name || existingUser.lastName,
        )
      } else {
        // Create new user with Google ID
        user = await this.userService.saveGoogleId(email, googleId, given_name, family_name)
      }

      return this.authService.generateTokens(user)
    } catch (err) {
      throw new UnauthorizedException()
    }
  }
}
