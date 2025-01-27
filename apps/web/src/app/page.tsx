'use client'
import styles from './page.module.css'
import Header from './components/header'
import Instructors from './components/instructors'
import Pricing from './components/pricing'
import About from './components/about'
import Pools from './components/pools'
import Photos from './components/photos'
import Nav from './components/nav'

export default function Index() {
  return (
    <div className={styles.page}>
      <Nav />
      <Header />
      <Photos />
      <About />
      <Instructors />
      <Pricing />
      <Pools />
    </div>
  )
}
