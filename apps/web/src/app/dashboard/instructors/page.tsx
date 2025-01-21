import Instructors from '../../components/instructors'

export default function Students() {
  return (
    <>
      <div className="py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Instructors</h1>
          </div>
        </header>
        <main className="px-6">
          <Instructors />
        </main>
      </div>
    </>
  )
}
