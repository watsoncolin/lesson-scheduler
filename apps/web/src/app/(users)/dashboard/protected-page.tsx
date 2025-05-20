import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useEffect } from 'react'

import { ReactNode } from 'react'
import Nav from './components/Nav'

const ProtectedPage = ({ children, redirectTo = '/sign-in' }: { children: ReactNode; redirectTo?: string }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userString = typeof window !== 'undefined' ? localStorage.getItem('user') : null
        const user = userString ? JSON.parse(userString) : null
        if (!user) {
          router.push(redirectTo)
        }
      } catch {
        router.push(redirectTo)
      } finally {
        setLoading(false)
      }
    }
    checkUser()
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
