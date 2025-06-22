'use client'
import { useUser } from '@/app/contexts/user-context'
import { Button } from '@/app/components/button'

export const ImpersonationBanner = () => {
  const { isImpersonating, impersonator, exitImpersonation, user } = useUser()

  if (!isImpersonating || !impersonator) {
    return null
  }

  return (
    <div className="bg-yellow-400 text-black p-2 text-center">
      <span>
        You are currently viewing the site as {user?.firstName} {user?.lastName}.{' '}
      </span>
      <Button onClick={exitImpersonation}>Return to your account ({impersonator.name})</Button>
    </div>
  )
}
