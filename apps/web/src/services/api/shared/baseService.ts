import { OpenAPI } from '@/api'

export type ApiConfig = {
  headers?: Record<string, string>
  credentials?: 'include' | 'omit' | 'same-origin'
}

export class BaseService {
  public static configure(config: ApiConfig = {}) {
    OpenAPI.BASE = process.env.NEXT_PUBLIC_API_URL || ''
    OpenAPI.HEADERS = config.headers
    OpenAPI.CREDENTIALS = config.credentials || 'include'
  }
}

BaseService.configure()
