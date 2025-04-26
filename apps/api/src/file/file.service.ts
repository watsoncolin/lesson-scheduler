import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Storage } from '@google-cloud/storage'
import { v4 as uuidv4 } from 'uuid'
import 'multer'
import * as fs from 'fs'
import * as path from 'path'

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
    const tempFilePath = path.join('/tmp', `${uuidv4()}.${fileExtension}`)

    const bucket = this.storage.bucket(this.bucketName)
    const blob = bucket.file(fileName)

    // Step 1: Save to temp file
    await fs.promises.writeFile(tempFilePath, file.buffer)

    // Step 2: Upload to GCS from file
    await new Promise<void>((resolve, reject) => {
      const localReadStream = fs.createReadStream(tempFilePath)
      const gcsWriteStream = blob.createWriteStream({
        resumable: false,
        validation: 'crc32c',
        metadata: {
          contentType: file.mimetype,
        },
        predefinedAcl: 'publicRead',
      })

      localReadStream
        .pipe(gcsWriteStream)
        .on('error', err => {
          console.error('Upload error:', err)
          reject(err)
        })
        .on('finish', () => {
          console.log('Upload finished.')
          resolve()
        })
    })

    // Step 3: Clean up temp file
    await fs.promises.unlink(tempFilePath)

    const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${fileName}`
    return publicUrl
  }
}
