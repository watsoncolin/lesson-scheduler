'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { ReactNode, useState } from 'react'
import { persistQueryClient, PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [persister, setPersister] = useState<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPersister(createSyncStoragePersister({ storage: window.localStorage }))
    }
  }, [])

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
            gcTime: 1000 * 60 * 10, // Keep cache for 10 minutes
          },
        },
      }),
  )

  if (persister) {
    persistQueryClient({
      queryClient,
      persister,
    })
  }

  if (!persister) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      {children}
    </PersistQueryClientProvider>
  )
}
