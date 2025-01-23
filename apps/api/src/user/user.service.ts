import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { UserEntity } from './entities/user.entity'
import { Model } from 'mongoose'
import { User } from './user'
import { ObjectId } from 'mongodb'
import { SignUpDto } from '../iam/authentication/dto/sign-up.dto'
import { UserForAuth } from './user-for-auth'

const mapper = (entity: UserEntity): User => {
  return {
    id: entity._id.toString(),
    email: entity.email,
    firstName: entity.firstName,
    lastName: entity.lastName,
    address1: entity.address1,
    address2: entity.address2,
    city: entity.city,
    state: entity.state,
    zip: entity.zip,
    phone: entity.phone,
    privateRegistration: entity.privateRegistration,
    role: entity.role,
  }
}
@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly model: Model<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const _id = new ObjectId()
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
  async signUp(signUpDto: SignUpDto) {
    await this.model.create({
      email: signUpDto.email,
      password: signUpDto.password,
    })
  }

  async findAll(): Promise<User[]> {
    return (await this.model.find()).map(mapper)
  }

  async findOne(id: string): Promise<User> {
    const entity = await this.model.findById(new ObjectId(id))
    if (!entity) {
      throw new NotFoundException()
    }
    return mapper(entity)
  }

  async findOneForAuth(email: string): Promise<UserForAuth> {
    const entity = await this.model.findOne(
      { email },
      {
        _id: 1,
        email: 1,
        password: 1,
        firstName: 1,
        lastName: 1,
        address1: 1,
        address2: 1,
        city: 1,
        state: 1,
        zip: 1,
        phone: 1,
        privateRegistration: 1,
      },
    )
    if (!entity) {
      throw new NotFoundException()
    }
    const user = mapper(entity)

    return {
      ...user,
      password: entity.password,
      resetToken: entity.resetToken,
    }
  }

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    await this.model.updateOne(
      { _id: new ObjectId(updateUserDto.id) },
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
    const entity = await this.model.findById(new ObjectId(updateUserDto.id))
    if (!entity) {
      throw new Error('User not found')
    }
    return mapper(entity)
  }

  async remove(id: string): Promise<void> {
    this.model.deleteOne({ _id: new ObjectId(id) })
  }

  async findOneByGoogleId({ googleId }: { googleId: string }) {
    const entity = await this.model.findOne({ googleId })
    return entity && mapper(entity)
  }

  async saveGoogleId(
    email: string,
    googleId: string,
    given_name: string | undefined,
    family_name: string | undefined,
  ): Promise<User> {
    const _id = new ObjectId()
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
      { _id: new ObjectId(user.id) },
      {
        $set: {
          resetToken: token,
        },
      },
    )
  }

  public async updatePassword(user: UserForAuth, password: string) {
    await this.model.updateOne(
      { _id: new ObjectId(user.id) },
      {
        $set: {
          password,
          resetToken: null,
        },
      },
    )
  }
}
