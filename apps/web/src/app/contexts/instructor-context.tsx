'use client'
import React, { createContext, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { InstructorService } from '@/services/api/shared/instructorService'
import { ReactNode } from 'react'
import { Instructor } from '../lib'

export interface InstructorsContextType {
  instructors: Instructor[]
  isLoading: boolean
  isError: boolean
  refetch: () => void
}

const InstructorContext = createContext<InstructorsContextType | null>(null)

interface InstructorsProviderProps {
  children: ReactNode
}

export const InstructorsProvider = ({ children }: InstructorsProviderProps) => {
  const {
    data: instructors,
    isLoading,
    isError,
    refetch,
  } = useQuery<Instructor[]>({
    queryKey: ['instructors'],
    queryFn: () => InstructorService.findAll(),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  })

  return (
    <InstructorContext.Provider value={{ instructors: instructors ?? [], isLoading, isError, refetch }}>
      {children}
    </InstructorContext.Provider>
  )
}

export const useInstructors = () => {
  const context = useContext(InstructorContext)
  if (!context) {
    throw new Error('useInstructors must be used within an InstructorsProvider')
  }
  return context
}
