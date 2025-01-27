'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { get } from '../utils/api'
import { ReactNode } from 'react'

export interface Pool {
  name: string
  role: string
  bio: string
  imageUrl: string
}

export interface PoolContextType {
  pools: Pool[]
  setPools: React.Dispatch<React.SetStateAction<any>>
}

const PoolContext = createContext<PoolContextType | null>(null)

interface PoolsProviderProps {
  children: ReactNode
}

export const PoolsProvider = ({ children }: PoolsProviderProps) => {
  const [pools, setPools] = useState([])

  // Fetch instructor details when the app initializes
  useEffect(() => {
    const fetchPools = async () => {
      const pools = await get('/pools')
      setPools(pools)
    }
    fetchPools()
  }, [])

  return <PoolContext.Provider value={{ pools, setPools }}>{children}</PoolContext.Provider>
}

export const usePools = () => useContext(PoolContext)
