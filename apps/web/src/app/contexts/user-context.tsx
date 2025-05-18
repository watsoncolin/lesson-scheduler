'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { ReactNode } from 'react'
import { UserResponseDto } from '@/api'
import { MeService } from '@/services/api/shared/meService'

export interface UserContextType {
  user: UserResponseDto | null
  refreshUser: () => void
}

const UserContext = createContext<UserContextType | null>(null)

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState(null as UserResponseDto | null)

  // Fetch user details when the app initializes
  useEffect(() => {
    fetchUserDetails()
  }, [])

  const fetchUserDetails = async () => {
    try {
      const response = await MeService.findMe()
      if (response) {
        setUser(response)
      } else {
        console.error('Failed to fetch user details')
      }
    } catch (error) {
      console.error('Error fetching user details:', error)
    }
  }

  return <UserContext.Provider value={{ user, refreshUser: fetchUserDetails }}>{children}</UserContext.Provider>
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserContext')
  }
  return context
}
