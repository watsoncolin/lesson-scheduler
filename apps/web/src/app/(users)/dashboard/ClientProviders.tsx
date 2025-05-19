'use client'
import ProtectedPage from './protected-page'
import { CreditsProvider, InstructorsProvider, PoolsProvider, UserProvider } from '@contexts/index'
import { AppProvider } from '../../app-provider'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import React from 'react'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <Analytics />
      <SpeedInsights />
      <ProtectedPage>
        <AppProvider>
          <InstructorsProvider>
            <PoolsProvider>
              <CreditsProvider>{children}</CreditsProvider>
            </PoolsProvider>
          </InstructorsProvider>
        </AppProvider>
      </ProtectedPage>
    </UserProvider>
  )
}
