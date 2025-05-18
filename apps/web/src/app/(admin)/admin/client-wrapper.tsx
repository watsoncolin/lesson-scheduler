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
    <GoogleOAuthProvider clientId="472605745668-v91hb1ig5c6sv9unnc8r0ddi7h0vvnu8.apps.googleusercontent.com">
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
