export const dynamic = 'force-dynamic'

import { TransactionsService } from '@/services/api/shared/transactionsService'
import Credits from './components/Credits'
import UpcomingLessons from './components/UpcomingLessons'
import styles from './page.module.css'
import { ScheduleService } from '@/services/api/shared/scheduleService'
import { PoolService } from '@/services/api/shared/poolService'
import { InstructorService } from '@/services/api/shared/instructorService'

export default async function Index() {
  const response = await TransactionsService.getMyCreditBalance()
  const credits = response.balances.find((b: any) => b.creditType === 'private')?.balance ?? 0
  const schedules = await ScheduleService.findMySchedule()
  const pools = await PoolService.findAll()
  const instructors = await InstructorService.findAll()
  const stats = [
    {
      name: 'Available lesson credits',
      stat: credits,
    },
    { name: 'Lessons scheduled', stat: schedules.length },
  ]

  return (
    <>
      <div className="py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main className="px-6">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-10">
            <div className={styles.page}>
              <Credits stats={stats} />
              <UpcomingLessons />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
