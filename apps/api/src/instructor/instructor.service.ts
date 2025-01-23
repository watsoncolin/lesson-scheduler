import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { ObjectId } from 'mongodb'
import { InstructorEntity } from './entities/instructor.entity'
import { Instructor } from './instructor'
import { CreateInstructorDto } from './dto/create-instructor.dto'
import { UpdateInstructorDto } from './dto/update-instructor.dto'

const mapper = (entity: InstructorEntity): Instructor => {
  return {
    id: entity._id.toString(),
    userId: entity.userId ? entity.userId.toString() : undefined,
    name: entity.name,
    bio: entity.bio,
    imageUrl: entity.imageUrl,
  }
}

@Injectable()
export class InstructorService {
  constructor(
    @InjectModel(InstructorEntity.name)
    private readonly model: Model<InstructorEntity>,
  ) {}
  async create(createInstructorDto: CreateInstructorDto): Promise<Instructor> {
    const _id = new ObjectId()
    const result = await this.model.create({
      _id,
      userId: createInstructorDto.userId ? new ObjectId(createInstructorDto.userId) : undefined,
      name: createInstructorDto.name,
      bio: createInstructorDto.bio,
      imageUrl: createInstructorDto.imageUrl,
    })
    const entity = await this.model.findById(result._id)
    if (!entity) {
      throw new Error('Instructor not found')
    }
    return mapper(entity)
  }

  async findAll(): Promise<Instructor[]> {
    return (await this.model.find()).map(mapper)
  }

  async findAllByUserId(userId: string): Promise<Instructor[]> {
    return (await this.model.find({ userId: new ObjectId(userId) })).map(mapper)
  }

  async findOne(id: string): Promise<Instructor> {
    const entity = await this.model.findById(new ObjectId(id))
    if (!entity) {
      throw new Error('Instructor not found')
    }
    return mapper(entity)
  }

  async update(updateInstructorDto: UpdateInstructorDto): Promise<Instructor> {
    const updates = {}
    if (updateInstructorDto.name) {
      updates['name'] = updateInstructorDto.name
    }
    if (updateInstructorDto.bio) {
      updates['bio'] = updateInstructorDto.bio
    }
    if (updateInstructorDto.imageUrl) {
      updates['imageUrl'] = updateInstructorDto.imageUrl
    }

    await this.model.updateOne(
      { _id: new ObjectId(updateInstructorDto.id) },
      {
        $set: {
          ...updates,
        },
      },
    )
    const entity = await this.model.findById(new ObjectId(updateInstructorDto.id))
    if (!entity) {
      throw new Error('Instructor not found')
    }
    return mapper(entity)
  }

  async remove(id: string): Promise<void> {
    await this.model.deleteOne({ _id: new ObjectId(id) })
  }
}
