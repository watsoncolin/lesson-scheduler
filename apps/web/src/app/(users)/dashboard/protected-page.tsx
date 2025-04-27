import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useEffect } from 'react'

import { ReactNode } from 'react'
import Nav from './components/nav'
import { getUser } from '@/app/utils/api'

const ProtectedPage = ({ children, redirectTo = '/sign-in' }: { children: ReactNode; redirectTo?: string }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = getUser()
    if (!user) {
      router.push(redirectTo)
    }
    setLoading(false)
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
