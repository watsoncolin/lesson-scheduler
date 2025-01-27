'use client'
import { GoogleLogin } from '@react-oauth/google'
import { useState, useEffect, Suspense } from 'react'
import LoginForm from './components/login-form'

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
            <GoogleLogin
              onSuccess={response => {
                fetch('http://localhost:3001/api/auth/google', {
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
                    document.location.href = '/dashboard'
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
