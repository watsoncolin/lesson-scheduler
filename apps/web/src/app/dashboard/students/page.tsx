'use client'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { useState, useEffect } from 'react'
import { del, get, patch, post } from '../../utils/api'
import StudentModal from './components/student-modal'
import { Student } from '../../lib/student'

function calculateAge(birthday: string | Date): number {
  const birthDate = new Date(birthday) // Convert the birthday to a Date object
  const ageDifMs = Date.now() - birthDate.getTime() // Difference in milliseconds
  const ageDate = new Date(ageDifMs) // Convert to Date object
  return Math.abs(ageDate.getUTCFullYear() - 1970) // Calculate the year difference
}

export default function Students() {
  const [students, setStudents] = useState([] as Student[])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)

  const handleSave = async (student: Student) => {
    if (student.id) {
      // Edit existing student
      await patch(`/users/me/students/${student.id}`, student)
      setStudents(prev => prev.map(s => (s.id === student.id ? student : s)))
    } else {
      // Add new student
      await post(`/users/me/students`, student)
      setStudents(prev => [...prev, { ...student }])
    }
    setIsModalOpen(false)
    fetchStudents()
  }

  const handleEdit = (student: Student) => {
    setEditingStudent(student)
    setIsModalOpen(true)
    fetchStudents()
  }

  const handleCreate = () => {
    setEditingStudent(null)
    setIsModalOpen(true)
    fetchStudents()
  }

  const handleDelete = async (student: Student) => {
    console.log('Deleting student:', student)
    if (student.id) {
      await del(`/users/me/students/${student.id}`)
      setStudents(prev => prev.filter(s => s.id !== student.id))
    }
    setIsModalOpen(false)
    fetchStudents()
  }
  const fetchStudents = async () => {
    try {
      const students = await get('/users/me/students')
      setStudents(students)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  return (
    <>
      <div className="py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">My Students</h1>
          </div>
        </header>
        <main className="px-6">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-10">
            <div>
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-base font-semibold leading-6 text-gray-900">Students</h1>
                  <p className="mt-2 text-sm text-gray-700">A list of all the students in your account.</p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                  <button
                    type="button"
                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleCreate}
                  >
                    Add student
                  </button>
                </div>
              </div>
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    {loading ? (
                      <p className="text-center text-sm text-gray-500">Loading students...</p>
                    ) : error ? (
                      <p className="text-center text-sm text-red-500">Error: {error}</p>
                    ) : students.length > 0 ? (
                      <ul role="list" className="divide-y divide-gray-100">
                        {students.map(student => (
                          <li
                            key={student.name}
                            className="relative flex justify-between gap-x-6 py-5"
                            onClick={() => handleEdit(student)}
                          >
                            <div className="flex min-w-0 gap-x-4">
                              <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">
                                  <a href="#">
                                    <span className="absolute inset-x-0 -top-px bottom-0" />
                                    {student.name}
                                  </a>
                                </p>
                                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                                  <a href={`mailto:${student.notes}`} className="relative truncate hover:underline">
                                    {student.notes}
                                  </a>
                                </p>
                              </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-x-4">
                              <div className="hidden sm:flex sm:flex-col sm:items-end">
                                <p className="text-sm leading-6 text-gray-900">Age {calculateAge(student.birthday)}</p>
                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                  Ability: <span>{student.ability}</span>
                                </p>
                              </div>
                              <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-center text-sm text-gray-500">No students found.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {isModalOpen && (
        <StudentModal
          student={editingStudent}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </>
  )
}
