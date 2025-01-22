import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { HashingService } from '../hashing/hashing.service'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'
import { UsersService } from '../../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { ActiveUserData } from './interfaces/active-user-data.interface'
import { User } from '../../users/user'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { Role } from '../../users/enums/role.enum'
import { EmailService } from '../../email/email.service'

@Injectable()
export class AuthenticationService {
  constructor(
    // private readonly logger: Logger,
    private readonly userService: UsersService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
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
    if (!user.password) {
      throw new UnauthorizedException('User does not have a password. User signed up with social login')
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
      this.signToken<Partial<ActiveUserData>>(user.id, { email: user.email }),
      this.signToken(user.id),
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
      const { sub } = await this.jwtService.verifyAsync<Pick<ActiveUserData, 'sub'>>(refreshTokenDto.refreshToken)

      const user = await this.userService.findOne(sub)
      return this.generateTokens(user)
    } catch (err) {
      throw new UnauthorizedException()
    }
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.userService.findOneForAuth(email)
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`)
    }
    await this.emailService.sendResetPasswordLink(email)
  }

  async resetPassword(token: string, password: string): Promise<void> {
    const email = await this.emailService.decodeConfirmationToken(token)

    const user = await this.userService.findOneForAuth(email)

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`)
    }

    const hashedPassword = await this.hashingService.hash(password)
    await this.userService.updatePassword(user, hashedPassword)
  }

  private async signToken<T>(userId: string, payload?: T) {
    return await this.jwtService.signAsync({
      sub: userId,
      ...payload,
    })
  }
}
