import { googleLogout } from '@react-oauth/google'
import { AuthService } from '@/services/api/shared/authService'
import { deleteCookie, AUTH_COOKIE_NAME } from '@/app/utils/cookies'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function SignOutButton() {
  async function handleSignOut(event: React.FormEvent) {
    event.preventDefault()
    try {
      // Sign out of Google
      googleLogout()
      // Call backend logout endpoint
      await AuthService.logout()
      // Remove local auth token and user info
      deleteCookie(AUTH_COOKIE_NAME)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user')
      }
      // Redirect to home page
      window.location.href = '/'
    } catch (error) {
      console.error('Error during sign out:', error)
      // Even if the backend call fails, try to clear local state
      deleteCookie(AUTH_COOKIE_NAME)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user')
      }
      window.location.href = '/'
    }
  }
  return (
    <form onSubmit={handleSignOut}>
      <button className={classNames('block px-4 py-2 text-sm text-gray-700')}>
        <div className="hidden md:block">Sign Out</div>
      </button>
    </form>
  )
}
