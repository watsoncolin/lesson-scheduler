import { NextResponse } from 'next/server'

export function middleware(req: {
  cookies: { get: (arg0: string) => any }
  url: string | URL | undefined
  headers: { get: (name: string) => string | null }
}) {
  // Check for Authorization header
  const authHeader = req.headers.get('Authorization')
  const token = authHeader ? authHeader.replace('Bearer ', '') : null

  if (!token) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  return NextResponse.next()
}
