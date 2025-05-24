import Pools from '@components/pools'
import Header from '../components/Header'

export default function PoolsPage() {
  return (
    <div>
      <Header title="Pools" />
      <main className="px-6">
        <Pools />
      </main>
    </div>
  )
}
