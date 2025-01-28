import { useEffect, useState } from 'react'
import { get } from '../../utils/api'
import { Schedule } from '../../lib'
import { useUser, useCredits } from '../../contexts'

export default function Credits() {
  const { user } = useUser()

  const { credits, refreshCredits } = useCredits()

  const [stats, setStats] = useState([] as { name: string; stat: number }[])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    refreshCredits()
  }, [])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const schedulesResponse = await get<Schedule[]>('/schedules/me')
        const stats = [
          {
            name: 'Available lesson credits',
            stat: credits,
          },
          { name: 'Lessons scheduled', stat: schedulesResponse.length },
        ]
        setStats(stats)
      } catch (err) {
        console.error(err)
        setError('Failed to load stats')
      } finally {
        setLoading(false)
      }
    }

    if (user?.id) {
      fetchStats()
    } else {
      setLoading(false)
    }
  }, [user?.id, credits])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  return (
    <div className="py-5">
      {/* <h3 className="text-base font-semibold leading-6 text-gray-900">Credit balances</h3> */}
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map(item => (
          <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.stat}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
