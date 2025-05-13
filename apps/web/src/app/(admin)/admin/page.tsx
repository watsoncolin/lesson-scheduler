import React from 'react'
import { StatsService } from '@/services/api/shared/statsService'

export const dynamic = 'force-dynamic'

export default async function Admin() {
  const stats = await StatsService.findAll()

  return (
    <>
      <div className="py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
          </div>
        </header>
        <main className="px-6">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-10">
            <div>
              <div className="sm:flex sm:items-center">
                <div className="py-5">
                  <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">Stats</h3>
                  <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 dark:text-white">
                    {[
                      { name: 'Private lesson credits purchased', stat: stats.privateLessons },
                      { name: 'Group lesson credits purchased', stat: stats.groupLessons },
                      { name: 'Purchased and unscheduled', stat: stats.unscheduledPrivateLessons },
                      { name: 'Total available lessons', stat: stats.availableLessons },
                      { name: 'Active users', stat: stats.activeUsers },
                    ].map(item => (
                      <div
                        key={item.name}
                        className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 dark:bg-black"
                      >
                        <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                          {item.stat}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
              <div className="mt-8 flow-root"></div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
