'use client'

import { useUser } from '../contexts/user-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Role } from '@lesson-scheduler/shared'

interface AdminProtectedPageProps {
  children: React.ReactNode
}

export function AdminProtectedPage({ children }: AdminProtectedPageProps) {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/sign-in')
      return
    }

    if (user.role !== Role.Admin && user.role !== Role.Instructor) {
      router.push('/')
    }
  }, [user, router])

  if (!user || (user.role !== Role.Admin && user.role !== Role.Instructor)) {
    return null
  }

  return <>{children}</>
}
