'use client'
import { GoogleLogin } from '@react-oauth/google'
import { Suspense } from 'react'
import LoginForm from './components/login-form'
import Link from 'next/link'
import router from 'next/router'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export default function Index() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-36 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <a href="/">
            <img className="mx-auto h-10 w-auto" src="/images/logo.png" alt="Stansbury Swim" />
          </a>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Suspense>
            <LoginForm />
          </Suspense>

          <div className="mt-10 text-center text-sm text-gray-500">
            <p className="mb-4">
              Don't have an account?{' '}
              <Link href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Register here
              </Link>
            </p>
            <GoogleLogin
              onSuccess={response => {
                fetch(`${API_BASE_URL}/auth/google`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    token: response.credential,
                  }),
                })
                  .then(response => response.json())
                  .then(data => {
                    router.push('/dashboard')
                  })
              }}
              onError={() => {
                console.log('Login Failed')
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
