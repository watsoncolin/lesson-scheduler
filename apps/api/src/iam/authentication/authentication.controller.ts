import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res } from '@nestjs/common'
import { AuthenticationService } from './authentication.service'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'
import { Response } from 'express'
import { Auth } from './decorators/auth.decorator'
import { AuthType } from './enums/auth-type.enum'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { ConfigService } from '@nestjs/config'

@Controller('auth')
@Auth(AuthType.None)
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  async signUp(@Res({ passthrough: true }) response: Response, @Body() signUpDto: SignUpDto) {
    const result = await this.authService.signUp(signUpDto)
    response.cookie('authToken', result.accessToken, {
      secure: this.configService.get('NODE_ENV') === 'production',
      httpOnly: true,
      sameSite: 'lax',
      domain: '.stansburyswim.com',
    })
    return result
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Res({ passthrough: true }) response: Response, @Body() signInDto: SignInDto) {
    const result = await this.authService.signIn(signInDto)
    response.cookie('authToken', result.accessToken, {
      secure: this.configService.get('NODE_ENV') === 'production',
      httpOnly: true,
      sameSite: 'lax',
      domain: '.stansburyswim.com',
    })
    return result
  }

  @HttpCode(HttpStatus.OK) // changed since the default is 201
  @Post('refresh-tokens')
  async refreshTokens(@Res({ passthrough: true }) response: Response, @Body() refreshTokenDto: RefreshTokenDto) {
    const result = await this.authService.refreshTokens(refreshTokenDto)
    response.cookie('authToken', result.accessToken, {
      secure: this.configService.get('NODE_ENV') === 'production',
      httpOnly: true,
      sameSite: 'lax',
      domain: '.stansburyswim.com',
    })
    return result
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) response: Response) {
    // Clear the auth cookie
    response.clearCookie('authToken')
    return { message: 'Logged out successfully' }
  }

  @Post('forgot-password')
  async forgotPassword(@Body() { email }: { email: string }): Promise<void> {
    return this.authService.forgotPassword(email)
  }

  @Post('reset-password')
  async resetPassword(@Body() { token, password }: { token: string; password: string }): Promise<void> {
    return this.authService.resetPassword(token, password)
  }
}
