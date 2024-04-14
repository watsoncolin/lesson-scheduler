import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  id: string;
  name: string;
  birthday: Date;
  ability: string;
  notes: string;
}
