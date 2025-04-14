'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { getCookie } from '../utils/cookies'
import { get } from '../utils/api'
import { ReactNode } from 'react'
import { User } from '../lib/user'

export interface UserContextType {
  user: User | null
  refreshUser: () => void
}

const UserContext = createContext<UserContextType | null>(null)

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState(null as User | null)

  // Fetch user details when the app initializes
  useEffect(() => {
    console.log('fetching user details')
    fetchUserDetails()
  }, [])

  const fetchUserDetails = async () => {
    try {
      console.log('fetching user details')
      const response = await get<User>('/users/me', {})
      console.log('response', response)
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
