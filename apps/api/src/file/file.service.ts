import { Injectable } from '@nestjs/common'
import { Storage } from '@google-cloud/storage'
import { ConfigService } from '@nestjs/config'
import { v4 as uuidv4 } from 'uuid'
import 'multer'
import * as path from 'path'

@Injectable()
export class FileService {
  private storage: Storage
  private bucket: string

  constructor(private configService: ConfigService) {
    const credentialsBase64 = this.configService.get<string>('GOOGLE_APPLICATION_CREDENTIALS')
    const keyFilename = path.join(process.cwd(), 'google-credentials.json')

    // Initialize Storage client with either base64 credentials or key file
    this.storage = new Storage(
      credentialsBase64
        ? {
            credentials: JSON.parse(Buffer.from(credentialsBase64, 'base64').toString()),
          }
        : {
            keyFilename,
          },
    )
    this.bucket = this.configService.get<string>('GCP_STORAGE_BUCKET', 'stansburyswim-public')
  }

  async uploadFile(file: Express.Multer.File, userId: string): Promise<string> {
    const fileExtension = file.originalname.split('.').pop()
    const fileName = `${userId}/${uuidv4()}.${fileExtension}`

    const bucket = this.storage.bucket(this.bucket)
    const blob = bucket.file(fileName)

    return new Promise((resolve, reject) => {
      const blobStream = blob.createWriteStream({
        resumable: false,
        validation: true,
        metadata: {
          contentType: file.mimetype,
        },
      })

      // Handle stream errors
      blobStream.on('error', error => {
        console.error('Stream error:', error)
        if (!blobStream.destroyed) {
          blobStream.destroy()
        }
        reject(error)
      })

      // Handle successful upload
      blobStream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${this.bucket}/${fileName}`
        resolve(publicUrl)
      })

      // Handle stream close
      blobStream.on('close', () => {
        console.log('Stream closed')
      })

      // Write the file buffer to the stream
      if (file.buffer) {
        const writeSuccess = blobStream.write(file.buffer)
        if (!writeSuccess) {
          blobStream.once('drain', () => {
            blobStream.end()
          })
        } else {
          blobStream.end()
        }
      } else {
        reject(new Error('File buffer is empty'))
      }
    })
  }
}
