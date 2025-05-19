import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useEffect } from 'react'

import { ReactNode } from 'react'
import Nav from './components/Nav'
import { MeService } from '@/services/api/shared/meService'

const ProtectedPage = ({ children, redirectTo = '/sign-in' }: { children: ReactNode; redirectTo?: string }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await MeService.findMe()
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
