'use client'
import ProtectedPage from './protected-page'
import Nav from './components/nav'
import React from 'react'
import { CreditsProvider, InstructorsProvider, PoolsProvider, UserProvider } from '@contexts/index'
import { AppProvider } from '../../app-provider'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <Analytics />
      <SpeedInsights />
      <ProtectedPage>
        <AppProvider>
          <InstructorsProvider>
            <PoolsProvider>
              <CreditsProvider>
                <div className="min-h-full">
                  <Nav />
                  <main className="mx-6">{children}</main>
                </div>
              </CreditsProvider>
            </PoolsProvider>
          </InstructorsProvider>
        </AppProvider>
      </ProtectedPage>
    </UserProvider>
  )
}
