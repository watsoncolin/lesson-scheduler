import '@/app/global.css'
import type { Metadata } from 'next'
import AdminLayout from './admin-layout'
import { UserProvider } from '@/app/contexts/user-context'
import { AdminProtectedPage } from '@/app/components/admin-protected-page'
export const metadata: Metadata = {
  title: {
    template: '%s - Stansbury Swim',
    default: 'Stansbury Swim',
  },
  description: '',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950"
    >
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body>
        <UserProvider>
          <AdminProtectedPage>
            <AdminLayout>{children}</AdminLayout>
          </AdminProtectedPage>
        </UserProvider>
      </body>
    </html>
  )
}
