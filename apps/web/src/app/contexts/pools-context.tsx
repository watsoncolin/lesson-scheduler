'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { PoolService } from '@/services/api/shared/poolService'
import { ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { PoolDto } from '@/api'

export interface PoolContextType {
  pools: PoolDto[]
  isLoading: boolean
  isError: boolean
  refetch: () => void
}

const PoolContext = createContext<PoolContextType | null>(null)

interface PoolsProviderProps {
  children: ReactNode
}

export const PoolsProvider = ({ children }: PoolsProviderProps) => {
  const {
    data: pools,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['pools'],
    queryFn: () => PoolService.findAll(),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  })

  return (
    <PoolContext.Provider value={{ pools: pools ?? [], isLoading, isError, refetch }}>{children}</PoolContext.Provider>
  )
}

export const usePools = () => {
  const context = useContext(PoolContext)
  if (!context) {
    throw new Error('usePools must be used within an PoolContext')
  }
  return context
}
