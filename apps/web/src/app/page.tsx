'use client'
import styles from './page.module.css'
import Header from './components/header'
import Instructors from './components/instructors'
import Pricing from './components/pricing'
import About from './components/about'
import Pools from './components/pools'
import Photos from './components/photos'
import Nav from './components/nav'
import { InstructorsProvider, PoolsProvider, UserProvider } from './contexts'
import { AppProvider } from './app-provider'
import ParentTot from './components/parent-tot'

export default function Index() {
  return (
    <AppProvider>
      <UserProvider>
        <InstructorsProvider>
          <PoolsProvider>
            <div className={styles.page}>
              <Nav />
              <Header />
              <Photos />
              <About />
              <Instructors />
              <Pricing />
              <Pools />
              <ParentTot />
            </div>
          </PoolsProvider>
        </InstructorsProvider>
      </UserProvider>
    </AppProvider>
  )
}
