import { GoogleOAuthProvider } from '@react-oauth/google'
import '../global.css'
import Footer from '../components/footer'

export const metadata = {
  title: 'Stansbury Swim',
  description: '',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId="472605745668-v91hb1ig5c6sv9unnc8r0ddi7h0vvnu8.apps.googleusercontent.com">
      <html className="h-full bg-white">
        <head>
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </head>
        <body className="h-full">
          <div className="bg-white flex min-h-screen flex-col">
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </body>
      </html>
    </GoogleOAuthProvider>
  )
}
