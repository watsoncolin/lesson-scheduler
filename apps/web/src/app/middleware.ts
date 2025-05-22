import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const authToken = request.cookies.get('authToken')?.value

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard')) {
    if (!authToken) {
      const signInUrl = new URL('/sign-in', request.url)
      return NextResponse.redirect(signInUrl)
    }
  }

  // Clone the request headers
  const requestHeaders = new Headers(request.headers)
  if (authToken) {
    requestHeaders.set('Authorization', `Bearer ${authToken}`)
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

// Configure which routes the middleware should run on
export const config = {
  matcher: ['/api/:path*', '/dashboard/:path*'],
}
