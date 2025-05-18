'use client'

import { GoogleLogin } from '@react-oauth/google'
import LoginForm from './login-form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { setUser } from '@/app/utils/api'
import { useState } from 'react'
import { GoogleAuthService } from '@/services/api/shared/googleAuthService'

export default function ClientSignIn() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  return (
    <>
      <LoginForm />
      <div className="mt-10 text-center text-sm text-gray-500">
        <p className="mb-4">
          Don't have an account?{' '}
          <Link href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Register here
          </Link>
        </p>
        <GoogleLogin
          onSuccess={async response => {
            try {
              const data = await GoogleAuthService.authenticate(response.credential ?? '')
              setUser(data)
              router.push('/dashboard')
            } catch (error) {
              console.log('Google login failed', error)
              setError(error instanceof Error ? error.message : 'An unknown error occurred')
            }
          }}
          onError={() => {
            console.log('Login Failed')
            setError('Login Failed')
          }}
        />
      </div>
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </>
  )
}
