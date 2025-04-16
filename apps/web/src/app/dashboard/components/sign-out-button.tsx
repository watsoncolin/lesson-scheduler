import { removeAuthToken } from '../../utils/api'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function SignOutButton() {
  async function handleSignOut(event: React.FormEvent) {
    event.preventDefault()
    removeAuthToken()

    window.location.href = '/'
  }
  return (
    <form onSubmit={handleSignOut}>
      <button className={classNames('block px-4 py-2 text-sm text-gray-700')}>
        <div className="hidden md:block">Sign Out</div>
      </button>
    </form>
  )
}
