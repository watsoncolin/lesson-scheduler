import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import jwtConfig from '../../config/jwt.config'
import { REQUEST_USER_KEY } from '../iam.constants'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromRequest(request)
    if (!token) {
      throw new UnauthorizedException()
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, this.jwtConfiguration)
      request[REQUEST_USER_KEY] = payload
    } catch (error) {
      console.log('error', error)
      throw new UnauthorizedException()
    }
    return true
  }

  private extractTokenFromRequest(request: Request): string | undefined {
    // First try to get token from cookies
    const cookieToken = request.cookies?.authToken
    if (cookieToken) {
      return cookieToken
    }

    // If not in cookies, try to get from Authorization header
    const [_, token] = request.headers.authorization?.split(' ') ?? []
    return token
  }
}
