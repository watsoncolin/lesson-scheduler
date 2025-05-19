export const dynamic = 'force-dynamic'

import PurchaseClient from '../components/PurchaseClient'
import { ProductService } from '@/services/api/shared/productService'
import { ScheduleService } from '@/services/api/shared/scheduleService'
import { StudentService } from '@/services/api/shared/studentService'
import { ConfigService } from '@/services/api/shared/configService'
import { WaitlistService } from '@/services/api/shared/waitlistService'

export default async function PurchasePage() {
  // Fetch all required data on the server
  const [products, schedules, students, config, waitlist] = await Promise.all([
    ProductService.findAll(),
    ScheduleService.findParentTot(),
    StudentService.findMyStudents(),
    ConfigService.findOne(),
    WaitlistService.me().catch(() => null), // waitlist may fail if not on waitlist
  ])

  return (
    <PurchaseClient
      products={products}
      schedules={schedules}
      students={students}
      waitlistEnabled={config.waitlistEnabled}
      onWaitlist={!!waitlist}
      purchaseEnabled={waitlist?.allowed ?? false}
    />
  )
}
