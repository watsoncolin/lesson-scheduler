import { Injectable } from '@nestjs/common'
import { Storage } from '@google-cloud/storage'
import { ConfigService } from '@nestjs/config'
import { v4 as uuidv4 } from 'uuid'
import 'multer'

@Injectable()
export class FileService {
  private storage: Storage
  private bucket: string

  constructor(private configService: ConfigService) {
    this.storage = new Storage()
    this.bucket = this.configService.get<string>('GCP_STORAGE_BUCKET', 'stansburyswim-public')
  }

  async uploadFile(file: Express.Multer.File, userId: string): Promise<string> {
    const fileExtension = file.originalname.split('.').pop()
    const fileName = `${userId}/${uuidv4()}.${fileExtension}`

    const bucket = this.storage.bucket(this.bucket)
    const blob = bucket.file(fileName)

    await blob.save(file.buffer, {
      resumable: false,
      validation: false,
      metadata: {
        contentType: file.mimetype,
      },
    })

    const publicUrl = `https://storage.googleapis.com/${this.bucket}/${fileName}`
    return publicUrl
  }
}
