import { User } from './user'

export interface UserForAuth extends User {
  password: string | null
  resetToken: string | null
  salt: string | null
  failedLoginAttempts: number
  lastFailedLogin: Date | null
}
