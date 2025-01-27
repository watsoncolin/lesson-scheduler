'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { getCookie } from '../utils/cookies'
import { get } from '../utils/api'

export interface User {
  id: string
  accessToken: string
  firstName: string
  lastName: string
  email: string
  zip: string
  state: string
  city: string
  address1: string
  address2: string
  phone: string
}

export interface UserContextType {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<any>>
}

const UserContext = createContext<UserContextType | null>(null)

import { ReactNode } from 'react'

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState(null)

  // Fetch user details when the app initializes
  useEffect(() => {
    const token = getCookie('authToken')

    if (token) {
      fetchUserDetails(token)
    }
  }, [])

  const fetchUserDetails = async (token: string) => {
    try {
      const response = await get('/users/me', {})
      if (response) {
        setUser(response)
      } else {
        console.error('Failed to fetch user details')
      }
    } catch (error) {
      console.error('Error fetching user details:', error)
    }
  }

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

// Custom hook to access user context
export const useUser = () => useContext(UserContext)
