import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PoolEntity, PoolSchema } from './entities/pool.entity'
import { PoolController } from './pool.controller'
import { PoolService } from './pool.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: PoolEntity.name, schema: PoolSchema }])],
  controllers: [PoolController],
  providers: [PoolService],
})
export class PoolModule {}
