import { Body, Controller, Post, Res } from '@nestjs/common'
import { Auth } from '../decorators/auth.decorator'
import { GoogleTokenDto } from '../dto/google-token.dto'
import { AuthType } from '../enums/auth-type.enum'
import { GoogleAuthenticationService } from './google-authentication.service'
import { Response } from 'express'
import { ConfigService } from '@nestjs/config'

@Auth(AuthType.None)
@Controller('auth/google')
export class GoogleAuthenticationController {
  constructor(
    private readonly googleAuthService: GoogleAuthenticationService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  async authenticate(@Res({ passthrough: true }) response: Response, @Body() tokenDto: GoogleTokenDto) {
    const result = await this.googleAuthService.authenticate(tokenDto.token)
    response.cookie('authToken', result.accessToken, {
      secure: this.configService.get('NODE_ENV') === 'production',
      httpOnly: true,
      sameSite: 'lax',
      domain: '.stansburyswim.com',
    })
    return result
  }
}
