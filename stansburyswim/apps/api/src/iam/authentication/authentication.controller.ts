import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common'
import { AuthenticationService } from './authentication.service'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'
import { Response } from 'express'
import { Auth } from './decorators/auth.decorator'
import { AuthType } from './enums/auth-type.enum'
import { RefreshTokenDto } from './dto/refresh-token.dto'

@Controller('auth')
@Auth(AuthType.None)
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('register')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto)
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Res({ passthrough: true }) response: Response, @Body() signInDto: SignInDto) {
    const user = await this.authService.signIn(signInDto)
    response.cookie('accessToken', user.accessToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
    })
    return user
  }
  @HttpCode(HttpStatus.OK) // changed since the default is 201
  @Post('refresh-tokens')
  refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto)
  }
}
