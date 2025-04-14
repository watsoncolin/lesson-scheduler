import { Role } from './enums/role.enum'

export class User {
  id: string
  firstName: string
  lastName: string
  email: string
  address1: string
  address2: string
  city: string
  state: string
  zip: string
  phone: string
  privateRegistration: boolean
  role: Role
  failedLoginAttempts: number
  lastFailedLogin: Date | null
}
