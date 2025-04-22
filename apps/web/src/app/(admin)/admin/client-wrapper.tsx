'use client'

import { UserProvider } from '@/app/contexts/user-context'
import { AdminProtectedPage } from '@/app/components/admin-protected-page'
import { AppProvider } from '@/app/app-provider'
import { CreditsProvider, InstructorsProvider, PoolsProvider } from '@contexts/index'
import { GoogleOAuthProvider } from '@react-oauth/google'

interface ClientWrapperProps {
  children: React.ReactNode
}

export function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <GoogleOAuthProvider clientId="299167588978-echgmfh32bhms6fe5sojp4ioh04jtlj3.apps.googleusercontent.com">
      <UserProvider>
        <AdminProtectedPage>
          <AppProvider>
            <InstructorsProvider>
              <PoolsProvider>
                <CreditsProvider>{children}</CreditsProvider>
              </PoolsProvider>
            </InstructorsProvider>
          </AppProvider>
        </AdminProtectedPage>
      </UserProvider>
    </GoogleOAuthProvider>
  )
}
