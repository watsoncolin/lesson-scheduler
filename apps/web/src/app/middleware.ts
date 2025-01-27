import { NextResponse } from 'next/server'

export function middleware(req: { cookies: { get: (arg0: string) => any }; url: string | URL | undefined }) {
  const token = req.cookies.get('authToken')

  if (!token) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  return NextResponse.next()
}
