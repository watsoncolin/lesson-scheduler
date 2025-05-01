import { User } from '../user'

export class UserRegisterEvent {
  constructor(public readonly user: User) {}
}
