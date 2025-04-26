import { Module } from '@nestjs/common'
import { StudentService } from './student.service'
import { MongooseModule } from '@nestjs/mongoose'
import { StudentEntity, StudentSchema } from './entities/student.entity'
import { MyStudentController } from './my-student.controller'
import { StudentController } from './student.controller'

@Module({
  imports: [MongooseModule.forFeature([{ name: StudentEntity.name, schema: StudentSchema }])],
  controllers: [MyStudentController, StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
