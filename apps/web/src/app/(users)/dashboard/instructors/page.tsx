import Instructors from '@components/instructors'
import Header from '../components/Header'

export default function InstructorsPage() {
  return (
    <div>
      <Header title="Instructors" />
      <main className="px-6">
        <Instructors />
      </main>
    </div>
  )
}
