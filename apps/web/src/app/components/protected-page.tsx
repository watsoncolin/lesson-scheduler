import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { getAuthToken } from '../utils/api'

import { ReactNode } from 'react'
import Nav from '../dashboard/components/nav'

const ProtectedPage = ({ children, redirectTo = '/sign-in' }: { children: ReactNode; redirectTo?: string }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getAuthToken()
    if (!token) {
      router.push(redirectTo) // Redirect to the specified page
    } else {
      setLoading(false) // Token exists; show the content
    }
  }, [router, redirectTo])
  if (loading) {
    return (
      <div>
        <Nav />
      </div>
    )
  }

  return <>{children}</>
}

export default ProtectedPage
