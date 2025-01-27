import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { getCookie } from '../utils/cookies'

import { ReactNode } from 'react'

const ProtectedPage = ({ children, redirectTo = '/sign-in' }: { children: ReactNode; redirectTo?: string }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getCookie('authToken')
    if (!token) {
      router.push(redirectTo) // Redirect to the specified page
    } else {
      setLoading(false) // Token exists; show the content
    }
  }, [router, redirectTo])

  if (loading) {
    return <div>Loading...</div> // Optional: Replace with a custom loading spinner
  }

  return <>{children}</>
}

export default ProtectedPage
