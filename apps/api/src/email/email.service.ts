import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'

import sgMail from '@sendgrid/mail'

import { ConfigEnum } from '../shared/config.enum'

@Injectable()
export class EmailService {
  constructor(
    public readonly jwtService: JwtService,
    public readonly configService: ConfigService,
    public readonly usersService: UsersService,
    public readonly logger: Logger,
  ) {}

  public async sendResetPasswordLink(email: string): Promise<void> {
    const payload = { email }

    const secret = this.configService.get(ConfigEnum.JwtVerificationTokenSecret)
    const expiresIn = this.configService.get(ConfigEnum.JwtVerificationTokenExpirationTime)

    const token = this.jwtService.sign(payload, {
      secret,
      expiresIn,
    })

    const user = await this.usersService.findOneForAuth(email)
    await this.usersService.updateResetToken(user, token)

    const url = `${this.configService.get(ConfigEnum.EmailResetPasswordUrl)}?token=${token}`

    const text = `Hi, \nTo reset your password, click here: ${url}`
    const msg = {
      to: email,
      from: 'no-reply@stansburyswim.com',
      subject: 'Reset your password',
      text: text,
    }
    return this.sendMail(msg)
  }

  public async decodeConfirmationToken(token: string): Promise<string> {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get(ConfigEnum.JwtVerificationTokenSecret),
      })

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email
      }
      throw new BadRequestException()
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired')
      }
      throw new BadRequestException('Bad confirmation token')
    }
  }

  private sendMail(options: sgMail.MailDataRequired) {
    const key = this.configService.get(ConfigEnum.SendGridApiKey)
    sgMail.setApiKey(key)

    sgMail
      .send(options)
      .then(response => {
        console.log(response[0].statusCode)
        console.log(response[0].headers)
      })
      .catch(error => {
        console.error(error)
      })
  }
}
