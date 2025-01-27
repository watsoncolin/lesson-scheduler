import { GoogleOAuthProvider } from '@react-oauth/google'
import './global.css'
import Footer from './components/footer'
import { UserProvider } from './components/user-context'

export const metadata = {
  title: 'Stansbury Swim',
  description: '',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId="299167588978-echgmfh32bhms6fe5sojp4ioh04jtlj3.apps.googleusercontent.com">
      <UserProvider>
        <html className="h-full bg-white">
          <head>
            <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
          </head>
          <body className="h-full">
            <div className="bg-white">
              {children}
              <Footer />
            </div>
          </body>
        </html>
      </UserProvider>
    </GoogleOAuthProvider>
  )
}
