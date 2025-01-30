'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { CreditBalance } from '../lib'
import { get } from '../utils/api'

interface CreditsContextType {
  credits: number
  refreshCredits: () => void
}

const CreditsContext = createContext<CreditsContextType | null>(null)

export const CreditsProvider = ({ children }: { children: React.ReactNode }) => {
  const [credits, setCredits] = useState(0)

  useEffect(() => {
    fetchCredits()
  }, [])

  const fetchCredits = async () => {
    const response = await get<CreditBalance>('/transactions/me/credit-balance')
    const credits = response.balances.find((b: any) => b.creditType === 'private')?.balance ?? 0
    setCredits(credits)
  }

  return <CreditsContext.Provider value={{ credits, refreshCredits: fetchCredits }}>{children}</CreditsContext.Provider>
}

export const useCredits = () => {
  const context = useContext(CreditsContext)
  if (!context) {
    throw new Error('useCredits must be used within a CreditsProvider')
  }
  return context
}
