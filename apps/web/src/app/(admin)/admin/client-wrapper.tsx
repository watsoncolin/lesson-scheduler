'use client'

import { UserProvider } from '@/app/contexts/user-context'
import AdminProtectedPage from './components/admin-protected-page'
import { AppProvider } from '@/app/app-provider'
import { CreditsProvider, InstructorsProvider, PoolsProvider } from '@contexts/index'
import { GoogleOAuthProvider } from '@react-oauth/google'

interface ClientWrapperProps {
  children: React.ReactNode
}

export function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
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
