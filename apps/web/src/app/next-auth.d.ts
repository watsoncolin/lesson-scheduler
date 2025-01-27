import 'next-auth'

declare module 'next-auth' {
  interface User {
    email: string
    name: string
    accessToken: string
    refreshToken: string
    sub: string
  }

  interface Session extends DefaultSession {
    user: User
    expires_in: string
    error: string
  }
}
