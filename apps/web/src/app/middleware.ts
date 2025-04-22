import { NextResponse } from 'next/server'
import { AUTH_COOKIE_NAME } from '@utils/cookies'
export function middleware(req: {
  cookies: { get: (arg0: string) => any }
  url: string | URL | undefined
  headers: { get: (name: string) => string | null }
}) {
  // Check for authToken cookie
  const authToken = req.cookies.get(AUTH_COOKIE_NAME)

  if (!authToken) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  return NextResponse.next()
}
