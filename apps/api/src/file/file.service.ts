import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Storage } from '@google-cloud/storage'
import { v4 as uuidv4 } from 'uuid'
import 'multer'

@Injectable()
export class FileService {
  private readonly storage: Storage
  private readonly bucketName: string

  constructor(private readonly configService: ConfigService) {
    this.storage = new Storage()
    this.bucketName = this.configService.get<string>('GCP_STORAGE_BUCKET') || 'stansburyswim-public'
  }
  async uploadFile(file: Express.Multer.File, userId: string): Promise<string> {
    const fileExtension = file.originalname.split('.').pop()
    const fileName = `${userId}/${uuidv4()}.${fileExtension}`

    const bucket = this.storage.bucket(this.bucketName)
    const blob = bucket.file(fileName)

    await new Promise<void>((resolve, reject) => {
      const stream = blob.createWriteStream({
        resumable: false,
        validation: 'crc32c', // 🔥 critical
        metadata: {
          contentType: file.mimetype,
        },
        predefinedAcl: 'publicRead', // optional
      })

      stream.on('error', err => {
        console.error('Stream error:', err)
        reject(err)
      })

      stream.on('finish', () => {
        console.log('Stream finished uploading.')
        resolve()
      })

      stream.end(file.buffer)
    })

    const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${fileName}`
    return publicUrl
  }
}
