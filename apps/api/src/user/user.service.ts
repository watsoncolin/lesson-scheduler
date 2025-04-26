import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { UserEntity } from './entities/user.entity'
import { Model, Types } from 'mongoose'
import { User } from './user'
import { SignUpDto } from '../iam/authentication/dto/sign-up.dto'
import { UserForAuth } from './user-for-auth'

const mapper = (entity: UserEntity): User => {
  return {
    id: entity._id.toString(),
    email: entity.email,
    firstName: entity.firstName,
    lastName: entity.lastName,
    address1: entity.address1 || '',
    address2: entity.address2 || '',
    city: entity.city || '',
    state: entity.state || '',
    zip: entity.zip || '',
    phone: entity.phone || '',
    privateRegistration: entity.privateRegistration || false,
    role: entity.role,
    failedLoginAttempts: entity.failedLoginAttempts || 0,
    lastFailedLogin: entity.lastFailedLogin || null,
  }
}
@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly model: Model<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const _id = new Types.ObjectId()
    await this.model.create({
      _id,
      email: createUserDto.email,
      password: createUserDto.password,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      address1: createUserDto.address1,
      address2: createUserDto.address2,
      city: createUserDto.city,
      state: createUserDto.state,
      zip: createUserDto.zip,
      phone: createUserDto.phone,
      privateRegistration: createUserDto.privateRegistration,
    })
    const entity = await this.model.findById(_id)
    if (!entity) {
      throw new Error('User not found')
    }
    return mapper(entity)
  }
  async signUp(signUpDto: SignUpDto, hashedPassword: string, salt: string): Promise<User> {
    const _id = new Types.ObjectId()

    const user = await this.model.findOne({ email: signUpDto.email.toLowerCase() })
    if (user) {
      throw new Error('User already exists')
    }

    await this.model.create({
      _id,
      email: signUpDto.email.toLowerCase(),
      password: hashedPassword,
      firstName: signUpDto.firstName,
      lastName: signUpDto.lastName,
      phone: signUpDto.phoneNumber,
      salt,
      failedLoginAttempts: 0,
      lastFailedLogin: null,
    })
    const entity = await this.model.findById(_id)
    if (!entity) {
      throw new Error('User not found')
    }
    return mapper(entity)
  }

  async findAll(page = 1, limit = 10): Promise<{ users: User[]; total: number }> {
    const skip = (page - 1) * limit
    const [users, total] = await Promise.all([
      this.model.find().skip(skip).limit(limit).exec(),
      this.model.countDocuments(),
    ])
    return {
      users: users.map(mapper),
      total,
    }
  }

  async findOne(id: string): Promise<User> {
    const entity = await this.model.findById(new Types.ObjectId(id))
    if (!entity) {
      throw new NotFoundException()
    }
    return mapper(entity)
  }

  async findOneForAuth(email: string): Promise<UserForAuth | null> {
    const entity = await this.model.findOne(
      { email: email.toLowerCase() },
      {
        _id: 1,
        email: 1,
        password: 1,
        salt: 1,
        firstName: 1,
        lastName: 1,
        role: 1,
        failedLoginAttempts: 1,
        lastFailedLogin: 1,
      },
    )
    if (!entity) {
      return null
    }
    const user = mapper(entity)

    return {
      ...user,
      password: entity.password || null,
      resetToken: entity.resetToken || null,
      salt: entity.salt,
    }
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.model.updateOne(
      { _id: new Types.ObjectId(userId) },
      {
        $set: {
          email: updateUserDto.email,
          firstName: updateUserDto.firstName,
          lastName: updateUserDto.lastName,
          address1: updateUserDto.address1,
          address2: updateUserDto.address2,
          city: updateUserDto.city,
          state: updateUserDto.state,
          zip: updateUserDto.zip,
          phone: updateUserDto.phone,
          privateRegistration: updateUserDto.privateRegistration,
        },
      },
    )
    const entity = await this.model.findById(new Types.ObjectId(userId))
    if (!entity) {
      throw new Error('User not found')
    }
    return mapper(entity)
  }

  async remove(id: string): Promise<void> {
    this.model.deleteOne({ _id: new Types.ObjectId(id) })
  }

  async findOneByGoogleId({ googleId }: { googleId: string }) {
    const entity = await this.model.findOne({ googleId })
    return entity && mapper(entity)
  }

  async addGoogleId(
    email: string,
    googleId: string,
    given_name: string | undefined,
    family_name: string | undefined,
  ): Promise<User> {
    await this.model.updateOne(
      { email },
      {
        $set: {
          googleId,
        },
      },
    )
    const entity = await this.model.findOne({ email })
    if (!entity) {
      throw new Error('User not found')
    }
    return mapper(entity)
  }
  async saveGoogleId(
    email: string,
    googleId: string,
    given_name: string | undefined,
    family_name: string | undefined,
  ): Promise<User> {
    const _id = new Types.ObjectId()
    await this.model.create({
      _id,
      email,
      googleId,
      firstName: given_name,
      lastName: family_name,
    })
    const entity = await this.model.findById(_id)
    if (!entity) {
      throw new Error('User not found')
    }
    return mapper(entity)
  }

  public async updateResetToken(user: UserForAuth, token: string) {
    return await this.model.updateOne(
      { _id: new Types.ObjectId(user.id) },
      {
        $set: {
          resetToken: token,
        },
      },
    )
  }

  public async updatePassword(user: UserForAuth, password: string, salt: string) {
    await this.model.updateOne(
      { _id: new Types.ObjectId(user.id) },
      {
        $set: {
          password,
          salt,
          resetToken: null,
          failedLoginAttempts: 0,
          lastFailedLogin: null,
        },
      },
    )
  }

  async incrementFailedAttempts(userId: string): Promise<void> {
    await this.model.updateOne(
      { _id: new Types.ObjectId(userId) },
      {
        $inc: { failedLoginAttempts: 1 },
        $set: { lastFailedLogin: new Date() },
      },
    )
  }

  async resetLoginAttempts(userId: string): Promise<void> {
    await this.model.updateOne(
      { _id: new Types.ObjectId(userId) },
      {
        $set: {
          failedLoginAttempts: 0,
          lastFailedLogin: null,
        },
      },
    )
  }
}
