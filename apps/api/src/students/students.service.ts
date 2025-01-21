import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentEntity } from './entities/student.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './student';
import { ObjectId } from 'mongodb';

const mapper = (entity: StudentEntity): Student => {
  return {
    id: entity._id.toString(),
    userId: entity.userId.toString(),
    name: entity.name,
    birthday: entity.birthday,
    ability: entity.ability,
    notes: entity.notes,
  };
};

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(StudentEntity.name)
    private readonly model: Model<StudentEntity>
  ) {}
  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const _id = new ObjectId();
    this.model.create({
      _id,
      userId: new ObjectId(createStudentDto.userId),
      name: createStudentDto.name,
      birthday: createStudentDto.birthday,
      ability: createStudentDto.ability,
      notes: createStudentDto.notes,
    });
    const entity = await this.model.findById(_id);
    return mapper(entity);
  }

  async findAll(): Promise<Student[]> {
    return (await this.model.find()).map(mapper);
  }

  async findAllByUserId(userId: string): Promise<Student[]> {
    return (await this.model.find({ userId: new ObjectId(userId) })).map(
      mapper
    );
  }

  async findOne(id: string): Promise<Student> {
    return mapper(await this.model.findById(new ObjectId(id)));
  }

  async update(updateStudentDto: UpdateStudentDto): Promise<Student> {
    await this.model.updateOne(
      { _id: new ObjectId(updateStudentDto.id) },
      {
        $set: {
          name: updateStudentDto.name,
          birthday: updateStudentDto.birthday,
          ability: updateStudentDto.ability,
          notes: updateStudentDto.notes,
        },
      }
    );
    const entity = await this.model.findById(new ObjectId(updateStudentDto.id));
    return mapper(entity);
  }

  async remove(id: string): Promise<void> {
    this.model.deleteOne({ _id: new ObjectId(id) });
  }
}
