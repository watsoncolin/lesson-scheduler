import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the auth token from the request cookies
  const authToken = request.cookies.get('authToken')?.value

  // Clone the request headers
  const requestHeaders = new Headers(request.headers)

  // Add the auth token to the request headers if it exists
  if (authToken) {
    requestHeaders.set('Authorization', `Bearer ${authToken}`)
  }

  // Return the response with the modified headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

// Configure which routes the middleware should run on
export const config = {
  matcher: '/api/:path*',
}
