import { ChevronRightIcon } from '@heroicons/react/20/solid'

const people = [
  { name: 'Arche', title: 'Doggy paddle', email: 'He loves chasing ducks.', role: '12' },
  { name: 'Bailey', title: 'Doggy paddle', email: 'He gets distracted very easily.', role: '5' },
  // More people...
]

export default function Students() {
  return (
    <>
      <div className="py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">My Students</h1>
          </div>
        </header>
        <main className="px-6">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-base font-semibold leading-6 text-gray-900">Students</h1>
                  <p className="mt-2 text-sm text-gray-700">A list of all the students in your account.</p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                  <button
                    type="button"
                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add student
                  </button>
                </div>
              </div>
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <ul role="list" className="divide-y divide-gray-100">
                      {people.map(person => (
                        <li key={person.email} className="relative flex justify-between gap-x-6 py-5">
                          <div className="flex min-w-0 gap-x-4">
                            {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" /> */}
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                <a href="#">
                                  <span className="absolute inset-x-0 -top-px bottom-0" />
                                  {person.name}
                                </a>
                              </p>
                              <p className="mt-1 flex text-xs leading-5 text-gray-500">
                                <a href={`mailto:${person.email}`} className="relative truncate hover:underline">
                                  {person.email}
                                </a>
                              </p>
                            </div>
                          </div>
                          <div className="flex shrink-0 items-center gap-x-4">
                            <div className="hidden sm:flex sm:flex-col sm:items-end">
                              <p className="text-sm leading-6 text-gray-900">Age {person.role}</p>
                              <p className="mt-1 text-xs leading-5 text-gray-500">
                                Skill level: <span>{person.title}</span>
                              </p>
                              {/* {person.lastSeen ? (
                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                  Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                                </p>
                              ) : (
                                <div className="mt-1 flex items-center gap-x-1.5">
                                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                  </div>
                                  <p className="text-xs leading-5 text-gray-500">Online</p>
                                </div>
                              )} */}
                            </div>
                            <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
