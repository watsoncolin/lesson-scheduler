'use client'

import { OpenAPI } from '@/api'

export const clientApi = {
  ...OpenAPI,
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include', // This ensures cookies are sent with requests
}
