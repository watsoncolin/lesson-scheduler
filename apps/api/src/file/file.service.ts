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
    console.log('uploadFile', userId)
    if (!file || !file.buffer) {
      throw new Error('File buffer is empty')
    }

    const fileExtension = file.originalname.split('.').pop()
    console.log('fileExtension', fileExtension)
    const fileName = `${userId}/${uuidv4()}.${fileExtension}`
    console.log('fileName', fileName)
    const bucket = this.storage.bucket(this.bucketName)
    const blob = bucket.file(fileName)

    await blob.save(file.buffer, {
      resumable: false,
      validation: false,
      metadata: {
        contentType: file.mimetype,
      },
      predefinedAcl: 'publicRead', // optional: make file public immediately
    })
    const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${fileName}`
    console.log('publicUrl', publicUrl)
    return publicUrl
  }
}
