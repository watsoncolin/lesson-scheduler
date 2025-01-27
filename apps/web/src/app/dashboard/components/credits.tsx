import { useEffect, useState } from 'react'
import { useUser, UserContextType, User } from '../../components/user-context'
import { get } from '../../utils/api'
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const stats_test = [
  { name: 'Private lesson balance', stat: '30' },
  { name: 'Group lesson balance', stat: '0' },
  { name: 'Lessons scheduled', stat: '20' },
  { name: 'Available credits', stat: '10' },
]

export default function Credits() {
  const context = useUser() as UserContextType
  const user = context?.user || ({} as User)

  const [stats, setStats] = useState(stats_test)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    // Replace with your API endpoint
    const fetchStats = async () => {
      try {
        const response = await get('/users/me/credit-balance', {})

        if (!response) {
          throw new Error('Failed to fetch stats')
        }
        const stats = [
          {
            name: 'Private lesson credits',
            stat: response.balances.find((b: any) => b.creditType == 'private')?.balance ?? 0,
          },
          {
            name: 'Group lesson credits',
            stat: response.balances.find((b: any) => b.creditType == 'group')?.balance ?? 0,
          },
          { name: 'Lessons scheduled', stat: 20 },
        ]
        setStats(stats)
      } catch (err) {
        console.error(err)
        setError('Failed to load stats')
      } finally {
        setLoading(false)
      }
    }

    if (user.id) {
      fetchStats()
    } else {
      setLoading(false)
    }
  }, [user.id])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  return (
    <div className="py-5">
      <h3 className="text-base font-semibold leading-6 text-gray-900">Credit balances</h3>
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
