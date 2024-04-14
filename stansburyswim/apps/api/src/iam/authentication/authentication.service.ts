import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { HashingService } from '../hashing/hashing.service'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'
import { UsersService } from '../../users/users.service'

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly logger: Logger,
    private readonly userService: UsersService,
    private readonly hashingService: HashingService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    try {
      this.userService.signUp(signUpDto)
    } catch (err) {
      this.logger.error(err)
      throw err
    }
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userService.findOneForAuth(signInDto.email)
    if (!user) {
      throw new UnauthorizedException('User does not exists')
    }
    const isEqual = await this.hashingService.compare(signInDto.password, user.password)
    if (!isEqual) {
      throw new UnauthorizedException('Password does not match')
    }
    // TODO: We'll fill this gap in the next lesson
    return true
  }
}
