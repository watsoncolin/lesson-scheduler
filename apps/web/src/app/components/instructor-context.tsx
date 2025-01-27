'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { get } from '../utils/api'
import { ReactNode } from 'react'

export interface Instructor {
  id: string
  name: string
  role: string
  bio: string
  imageUrl: string
}

export interface InstructorsContextType {
  instructors: Instructor[]
  setInstructors: React.Dispatch<React.SetStateAction<any>>
}

const InstructorContext = createContext<InstructorsContextType | null>(null)

interface InstructorsProviderProps {
  children: ReactNode
}

export const InstructorsProvider = ({ children }: InstructorsProviderProps) => {
  const [instructors, setInstructors] = useState([])

  // Fetch instructor details when the app initializes
  useEffect(() => {
    const fetchInstructors = async () => {
      const instructors = await get('/instructors')
      setInstructors(instructors)
    }
    fetchInstructors()
  }, [])

  return <InstructorContext.Provider value={{ instructors, setInstructors }}>{children}</InstructorContext.Provider>
}

export const useInstructors = () => useContext(InstructorContext)
