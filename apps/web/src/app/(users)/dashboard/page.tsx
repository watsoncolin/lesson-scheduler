export const dynamic = 'force-dynamic'

import { TransactionsService } from '@/services/api/shared/transactionsService'
import Credits from './components/Credits'
import UpcomingLessons from './components/UpcomingLessons'
import styles from './page.module.css'
import { ScheduleService } from '@/services/api/shared/scheduleService'
import { PoolService } from '@/services/api/shared/poolService'
import { InstructorService } from '@/services/api/shared/instructorService'
import Header from './components/Header'

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
    <div>
      <Header title="Dashboard" />
      <main className="px-6">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className={styles.page}>
            <Credits stats={stats} />
            <UpcomingLessons instructors={instructors} pools={pools} />
          </div>
        </div>
      </main>
    </div>
  )
}
