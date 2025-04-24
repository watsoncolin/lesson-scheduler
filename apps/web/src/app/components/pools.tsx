'use client'
import React from 'react'
import { usePools } from '@contexts/pools-context'

export default function Pools() {
  const { pools } = usePools()

  return (
    <div id="pools" className="bg-white py-12 md:py-10 lg:py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Pools</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We have four pools in Stansbury Park and Grantsville. Each pool is unique and offers a different experience
            for our swimmers.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-8 xl:col-span-2"
        >
          {pools.map(pool => (
            <li key={pool.name}>
              <img className="aspect-[3/2] w-full rounded-2xl object-cover" src={pool.imageUrl} alt="" />
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">{pool.name}</h3>
              <p className="text-base leading-7 text-gray-600">{pool.address}</p>
              <p className="mt-4 text-base leading-7 text-gray-600">{pool.details}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
