import { Injectable } from '@nestjs/common'
import { CreateStudentDto } from './dto/create-student.dto'
import { UpdateStudentDto } from './dto/update-student.dto'
import { StudentEntity } from './entities/student.entity'
import { Model, Types } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Student } from './student'

const mapper = (entity: StudentEntity): Student => {
  return {
    id: entity._id.toString(),
    userId: entity.userId.toString(),
    name: entity.name,
    birthday: entity.birthday,
    ability: entity.ability,
    notes: entity.notes,
  }
}

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(StudentEntity.name)
    private readonly model: Model<StudentEntity>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const _id = new Types.ObjectId()
    const result = await this.model.create({
      _id,
      userId: new Types.ObjectId(createStudentDto.userId),
      name: createStudentDto.name.trim(),
      birthday: new Date(createStudentDto.birthday),
      ability: createStudentDto.ability.trim(),
      notes: createStudentDto.notes.trim(),
    })
    const entity = await this.model.findById(result._id)
    if (!entity) {
      throw new Error('Student not found')
    }
    return mapper(entity)
  }

  async findAll(): Promise<Student[]> {
    return (await this.model.find()).map(mapper)
  }

  async findAllByUserId(userId: string): Promise<Student[]> {
    return (await this.model.find({ userId: new Types.ObjectId(userId), deletedAt: { $exists: false } })).map(mapper)
  }

  async findOne(id: string): Promise<Student> {
    const entity = await this.model.findById(new Types.ObjectId(id))
    if (!entity) {
      throw new Error('Student not found')
    }
    return mapper(entity)
  }

  async update(updateStudentDto: UpdateStudentDto): Promise<Student> {
    const updates: any = {}
    if (updateStudentDto.name) {
      updates['name'] = updateStudentDto.name.trim()
    }
    if (updateStudentDto.birthday) {
      updates['birthday'] = new Date(updateStudentDto.birthday)
    }
    if (updateStudentDto.ability) {
      updates['ability'] = updateStudentDto.ability.trim()
    }
    if (updateStudentDto.notes) {
      updates['notes'] = updateStudentDto.notes.trim()
    }

    await this.model.updateOne(
      { _id: new Types.ObjectId(updateStudentDto.id) },
      {
        $set: {
          ...updates,
        },
      },
    )
    const entity = await this.model.findById(new Types.ObjectId(updateStudentDto.id))
    if (!entity) {
      throw new Error('Student not found')
    }
    return mapper(entity)
  }

  async remove(id: string): Promise<void> {
    await this.model.updateOne({ _id: new Types.ObjectId(id) }, { $set: { deletedAt: new Date() } })
  }
}
