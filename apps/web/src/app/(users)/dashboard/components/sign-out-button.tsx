import { removeAuthToken, logout } from '@utils/api'
import { googleLogout } from '@react-oauth/google'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function SignOutButton() {
  async function handleSignOut(event: React.FormEvent) {
    event.preventDefault()
    try {
      // Sign out of Google
      googleLogout()
      // Call backend logout endpoint and remove local auth token
      await logout()
      // Redirect to home page
      window.location.href = '/'
    } catch (error) {
      console.error('Error during sign out:', error)
      // Even if the backend call fails, try to clear local state
      await removeAuthToken()
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
