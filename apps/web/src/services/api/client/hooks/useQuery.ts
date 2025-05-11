'use client'

import { useQuery } from '@tanstack/react-query'
import { clientApi } from '../api'

export function useApiQuery<T>(key: string, fetcher: () => Promise<T>) {
  return useQuery({
    queryKey: [key],
    queryFn: fetcher,
  })
}
