import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import cookieParser from 'cookie-parser'
import { HttpExceptionFilter } from './logger/http-exception.filter'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as fs from 'fs'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  )

  app.use(cookieParser())
  app.useGlobalFilters(new HttpExceptionFilter())

  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['https://stansburyswim.com', 'https://www.stansburyswim.com', 'http://localhost:3000']

  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })

  // 🔹 Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Stansbury Swim API')
    .setDescription('API documentation for Stansbury Swim backend')
    .setVersion('1.0')
    .addBearerAuth() // optional, include if using Authorization headers
    .build()

  const document = SwaggerModule.createDocument(app, config)

  // Serve raw JSON at /api-json
  app.use('/api-json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(document)
  })

  // Optional: write to file for local codegen
  fs.writeFileSync('./openapi.json', JSON.stringify(document, null, 2))

  const port = process.env.PORT || 3001
  await app.listen(port)

  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`)
  Logger.log(`📘 Swagger docs available at: http://localhost:${port}/${globalPrefix}/docs`)
}

bootstrap()
