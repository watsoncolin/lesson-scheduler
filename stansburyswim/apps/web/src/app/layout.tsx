import { GoogleOAuthProvider } from '@react-oauth/google'
import './global.css'
import Footer from './components/footer'
import Nav from './components/nav'

export const metadata = {
  title: 'Stansbury Swim',
  description: '',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId="299167588978-echgmfh32bhms6fe5sojp4ioh04jtlj3.apps.googleusercontent.com">
      <html className="h-full bg-white">
        <body className="h-full">
          <div className="bg-white">
            <Nav />
            {children}
            <Footer />
          </div>
        </body>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </html>
    </GoogleOAuthProvider>
  )
}
