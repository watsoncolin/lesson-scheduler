// Cookie settings
const COOKIE_SETTINGS = process.env.NODE_ENV === 'development' ? 'path=/;' : 'path=/; Secure'

export const AUTH_COOKIE_NAME = 'authToken'

// Client-side cookie functions
export const setCookie = (name: string, value: string, days = 7) => {
  if (typeof window === 'undefined') return // Skip if running on server

  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000) // Expiration time in days
  const expires = `expires=${date.toUTCString()}`
  // Save the token in cookies
  document.cookie = `${name}=${value}; ${expires}; ${COOKIE_SETTINGS}`
}

export const getCookie = (name: string) => {
  if (typeof window === 'undefined') return null // Skip if running on server

  const value = `; ${document.cookie}` // Get all cookies
  const parts = value.split(`; ${name}=`) // Split by the cookie name
  if (parts.length === 2) {
    const part = parts.pop()
    if (part) return part.split(';').shift() // Return the cookie value
  }
  return null // Return null if not found
}

export const deleteCookie = (name: string) => {
  if (typeof window === 'undefined') return // Skip if running on server

  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure`
}

// Server-side cookie functions
export const getServerCookie = async (name: string) => {
  if (typeof window !== 'undefined') return null // Skip if running on client

  const { cookies } = await import('next/headers')
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
  if (typeof window !== 'undefined') return // Skip if running on client

  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()
  cookieStore.set(name, value, {
    ...options,
    path: options.path || '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: options.sameSite || 'lax',
  })
}

export const deleteServerCookie = async (name: string) => {
  if (typeof window !== 'undefined') return // Skip if running on client

  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()
  cookieStore.delete(name)
}
