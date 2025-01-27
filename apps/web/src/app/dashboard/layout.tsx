'use client'
import ProtectedPage from '../components/protected-page'
import { UserProvider } from '../components/user-context'
import { InstructorsProvider } from '../components/instructor-context'
import { PoolsProvider } from '../components/pools-context'
import Nav from './components/nav'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedPage>
      <UserProvider>
        <InstructorsProvider>
          <PoolsProvider>
            <div className="min-h-full">
              <Nav />
              <main className="mx-6">{children}</main>
            </div>
          </PoolsProvider>
        </InstructorsProvider>
      </UserProvider>
    </ProtectedPage>
  )
}
