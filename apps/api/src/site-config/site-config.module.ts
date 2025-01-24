import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { SiteConfigEntity, SiteConfigSchema } from './entities/site-config.entity'
import { SiteConfigService } from './site-config.service'
import { SiteConfigController } from './site-config.controller'

@Module({
  imports: [MongooseModule.forFeature([{ name: SiteConfigEntity.name, schema: SiteConfigSchema }])],
  controllers: [SiteConfigController],
  providers: [SiteConfigService],
  exports: [SiteConfigService],
})
export class SiteConfigModule {}
