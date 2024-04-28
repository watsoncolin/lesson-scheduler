import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { HashingService } from '../hashing/hashing.service'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'
import { UsersService } from '../../users/users.service'
import { ConfigType } from '@nestjs/config'
import jwtConfig from '../config/jwt.config'
import { JwtService } from '@nestjs/jwt'
import { ActiveUserData } from './interfaces/active-user-data.interface'
import { User } from '../../users/user'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { Role } from '../../users/enums/role.enum'

@Injectable()
export class AuthenticationService {
  constructor(
    // private readonly logger: Logger,
    private readonly userService: UsersService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY) // 👈
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const password = await this.hashingService.hash(signUpDto.password)
    // eslint-disable-next-line no-useless-catch
    try {
      this.userService.signUp({
        email: signUpDto.email,
        password,
      })
    } catch (err) {
      // this.logger.error(err)
      throw err
    }
  }

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ accessToken: string; refreshToken: string; id: string; role: Role; name: string }> {
    const user = await this.userService.findOneForAuth(signInDto.email)
    if (!user) {
      throw new UnauthorizedException('User does not exists')
    }
    const isEqual = await this.hashingService.compare(signInDto.password, user.password)
    if (!isEqual) {
      throw new UnauthorizedException('Password does not match')
    }
    return await this.generateTokens(user)
  }

  async generateTokens(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string; id: string; role: Role; name: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(user.id, this.jwtConfiguration.accessTokenTtl, { email: user.email }),
      this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl),
    ])
    return {
      accessToken,
      refreshToken,
      id: user.id,
      role: user.role,
      name: user.firstName,
    }
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync<Pick<ActiveUserData, 'sub'>>(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      })

      const user = await this.userService.findOne(sub)
      return this.generateTokens(user)
    } catch (err) {
      throw new UnauthorizedException()
    }
  }

  private async signToken<T>(userId: string, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    )
  }
}
