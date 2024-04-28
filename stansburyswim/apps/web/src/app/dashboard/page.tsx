'use client'
import Credits from './components/credits'
import UpcomingLessons from './components/upcoming-lessons'
import styles from './page.module.css'
import { useState } from 'react'

export default function Index() {
  return (
    <div className={styles.page}>
      <Credits />

      <UpcomingLessons />
    </div>
  )
}
