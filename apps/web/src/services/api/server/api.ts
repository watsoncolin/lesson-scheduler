import { OpenAPI } from '@/api'
import { cookies } from 'next/headers'

export const serverApi = {
  ...OpenAPI,
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Cookie: cookies().toString(),
  },
}
