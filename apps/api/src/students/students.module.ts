import { Module } from '@nestjs/common'
import { StudentsService } from './students.service'
import { StudentsController } from './students.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { StudentEntity, StudentSchema } from './entities/student.entity'
import { MyStudentsController } from './my-students.controller'

@Module({
  imports: [MongooseModule.forFeature([{ name: StudentEntity.name, schema: StudentSchema }])],
  controllers: [MyStudentsController, StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
