'use client'
import Credits from './components/credits'
import UpcomingLessons from './components/upcoming-lessons'
import styles from './page.module.css'

export default function Index() {
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
              <Credits />
              <UpcomingLessons />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
