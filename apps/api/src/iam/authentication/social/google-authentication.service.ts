import { Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { OAuth2Client } from 'google-auth-library'
import { AuthenticationService } from '../authentication.service'
import { UsersService } from 'src/users/users.service'

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
      if (!loginTicket) {
        throw new UnauthorizedException()
      }
      const payload = loginTicket.getPayload()
      if (!payload) {
        throw new UnauthorizedException()
      }
      const { email, sub: googleId, given_name, family_name } = payload
      const user = await this.userService.findOneByGoogleId({ googleId })
      if (user) {
        return this.authService.generateTokens(user)
      } else {
        if (!email) {
          throw new UnauthorizedException()
        }
        const newUser = await this.userService.saveGoogleId(email, googleId, given_name, family_name)
        return this.authService.generateTokens(newUser)
      }
    } catch (err) {
      throw new UnauthorizedException()
    }
  }
}
