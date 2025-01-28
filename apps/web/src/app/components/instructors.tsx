'use client'
import React from 'react'
import { useInstructors } from '../contexts'

export default function Instructors() {
  const { instructors } = useInstructors()
  return (
    <div id="team" className="bg-white py-12 md:py-10 lg:py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our team</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We're a dynamic group of individuals who are passionate about what we do and dedicated to delivering the
            best results for our students.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-8 xl:col-span-2"
        >
          {instructors.length > 0 ? (
            instructors.map(instructor => (
              <li key={instructor.id}>
                <img className="aspect-[3/2] w-full rounded-2xl object-cover" src={instructor.imageUrl} alt="" />
                <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">{instructor.name}</h3>
                <p className="text-base leading-7 text-gray-600">{instructor.role}</p>
                <p className="mt-4 text-base leading-7 text-gray-600">{instructor.bio}</p>
              </li>
            ))
          ) : (
            <p className="text-center text-sm text-gray-500">No instructors found.</p>
          )}
        </ul>
      </div>
    </div>
  )
}
