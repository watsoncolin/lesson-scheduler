/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transforms plain objects into class instances
      whitelist: true, // Strips properties that do not belong to the DTO class
      forbidNonWhitelisted: false, // Throws an error if non-whitelisted properties are found
    }),
  )
  app.enableCors({
    origin: ['https://stansburyswim.com', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
  const port = process.env.PORT || 3001
  await app.listen(port)
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`)
}

bootstrap()
