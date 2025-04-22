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

    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        contentType: file.mimetype,
      },
    })

    return new Promise((resolve, reject) => {
      blobStream.on('error', error => reject(error))
      blobStream.on('finish', async () => {
        try {
          // Instead of making the file public, generate a signed URL that expires in 1 year
          const [url] = await blob.getSignedUrl({
            action: 'read',
            expires: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1 year from now
          })
          resolve(url)
        } catch (error) {
          reject(error)
        }
      })
      blobStream.end(file.buffer)
    })
  }
}
