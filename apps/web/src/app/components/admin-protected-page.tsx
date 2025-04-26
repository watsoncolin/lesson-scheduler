'use client'

import { useUser } from '../contexts/user-context'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Role } from '@lesson-scheduler/shared'

interface AdminProtectedPageProps {
  children: React.ReactNode
}

export function AdminProtectedPage({ children }: AdminProtectedPageProps) {
  const { user } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      return
    }
    setLoading(false)

    if (user.role !== Role.Admin && user.role !== Role.Instructor) {
      router.push('/')
    }
  }, [user, router])

  if (loading) {
    console.log('loading')
    return <div>Loading...</div>
  }

  if (user?.role !== Role.Admin && user?.role !== Role.Instructor) {
    return <div>Not authorized</div>
  }

  return <>{children}</>
}
