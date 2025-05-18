import { FilesService } from '@/api/services/FilesService'
import { BaseService, WithConfig } from './baseService'

@WithConfig()
export class FileService extends BaseService {
  static async uploadFile(file: File) {
    return FilesService.fileControllerUploadFile({
      file: file,
    })
  }
}
