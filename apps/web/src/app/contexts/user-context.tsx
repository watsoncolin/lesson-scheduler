'use client'
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { UserResponseDto, ApiError, AuthenticationService } from '@/api'
import { MeService } from '@/services/api/shared/meService'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'

interface Impersonator {
  id: string
  name: string
}

export interface UserContextType {
  user: UserResponseDto | null
  refreshUser: () => void
  isImpersonating: boolean
  impersonator: Impersonator | null
  exitImpersonation: () => void
}

const UserContext = createContext<UserContextType | null>(null)

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserResponseDto | null>(null)
  const [isImpersonating, setIsImpersonating] = useState(false)
  const [impersonator, setImpersonator] = useState<Impersonator | null>(null)

  const fetchUserDetails = useCallback(async () => {
    try {
      const user = localStorage.getItem('user')
      const token = user ? JSON.parse(user).accessToken : null

      if (token) {
        const decodedToken: any = jwtDecode(token)
        if (decodedToken.impersonatorId) {
          setIsImpersonating(true)
          const adminUser = await MeService.findUserById(decodedToken.impersonatorId)
          if (adminUser) {
            setImpersonator({ id: adminUser.id, name: adminUser.firstName })
          }
        } else {
          setIsImpersonating(false)
          setImpersonator(null)
        }
      }

      const response = await MeService.findMe()
      if (response) {
        setUser(response)
      } else {
        console.error('Failed to fetch user details')
        setUser(null)
      }
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        console.error('User is not authenticated')
        setUser(null)
        // redirect('/sign-in')
      } else {
        console.error('Error fetching user details:', error)
      }
    }
  }, [])

  useEffect(() => {
    fetchUserDetails()
  }, [fetchUserDetails])

  const exitImpersonation = async () => {
    try {
      const adminUser = await AuthenticationService.authenticationControllerExitImpersonation()
      localStorage.setItem('user', JSON.stringify(adminUser))
      setUser(adminUser)
      setIsImpersonating(false)
      setImpersonator(null)
      localStorage.removeItem('adminUser')
      window.location.href = '/dashboard'
    } catch (error) {
      console.error('Error exiting impersonation:', error)
    }
  }

  return (
    <UserContext.Provider
      value={{ user, refreshUser: fetchUserDetails, isImpersonating, impersonator, exitImpersonation }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserContext')
  }
  return context
}
