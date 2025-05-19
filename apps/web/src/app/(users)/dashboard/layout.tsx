import ClientProviders from './ClientProviders'
import Nav from './components/Nav'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClientProviders>
      <div className="min-h-full">
        <Nav />
        <main className="mx-6">{children}</main>
      </div>
    </ClientProviders>
  )
}
