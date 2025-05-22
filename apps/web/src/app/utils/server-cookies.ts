import { cookies } from 'next/headers'

export const getServerCookie = async (name: string) => {
  const cookieStore = await cookies()
  return cookieStore.get(name)?.value
}

export const setServerCookie = async (
  name: string,
  value: string,
  options: {
    maxAge?: number
    path?: string
    domain?: string
    secure?: boolean
    httpOnly?: boolean
    sameSite?: 'lax' | 'strict' | 'none'
  } = {},
) => {
  const cookieStore = await cookies()
  cookieStore.set(name, value, {
    ...options,
    maxAge: options.maxAge ?? 30 * 24 * 60 * 60, // 30 days in seconds
    path: options.path || '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: options.sameSite || 'lax',
  })
}

export const deleteServerCookie = async (name: string) => {
  const cookieStore = await cookies()
  cookieStore.delete(name)
}
