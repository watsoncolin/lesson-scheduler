import { ConflictException, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { OAuth2Client } from 'google-auth-library'
import { AuthenticationService } from '../authentication.service'
import { UsersService } from 'apps/api/src/users/users.service'

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthenticationService,
    private readonly userService: UsersService,
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
      const { email, sub: googleId, given_name, family_name } = loginTicket.getPayload()
      const user = await this.userService.findOneByGoogleId({ googleId })
      if (user) {
        return this.authService.generateTokens(user)
      } else {
        const newUser = await this.userService.saveGoogleId(email, googleId, given_name, family_name)
        return this.authService.generateTokens(newUser)
      }
    } catch (err) {
      throw new UnauthorizedException()
    }
  }
}
