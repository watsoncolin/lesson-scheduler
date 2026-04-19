export default function VersionBadge() {
  const sha = process.env.NEXT_PUBLIC_GIT_SHA
  if (!sha) return null
  return (
    <div className="pointer-events-none fixed bottom-2 left-2 z-50 select-none text-xs text-gray-400">
      {sha}
    </div>
  )
}
