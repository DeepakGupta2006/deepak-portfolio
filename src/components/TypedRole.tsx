import { useEffect, useState } from 'react'

const ROLES = [
  'Full Stack Developer',
  'Software Developer',
  'AI Developer',
  'DSA Enthusiast',
]

export default function TypedRole() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = ROLES[roleIndex]
    const isPausing = !deleting && text === current
    const speed = isPausing ? 1500 : deleting ? 35 : 65

    const timeout = setTimeout(() => {
      if (isPausing) {
        setDeleting(true)
      } else if (!deleting) {
        setText(current.slice(0, text.length + 1))
      } else if (text.length > 0) {
        setText(current.slice(0, text.length - 1))
      } else {
        setDeleting(false)
        setRoleIndex((i) => (i + 1) % ROLES.length)
      }
    }, speed)

    return () => clearTimeout(timeout)
  }, [text, deleting, roleIndex])

  return (
    <span className="inline-flex items-center font-mono">
      <span className="mr-2 text-indigo-400 font-normal">&gt;</span>
      <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(34,211,238,0.35)]">
        {text}
      </span>
      <span className="ml-1 inline-block w-[2.5px] h-[0.95em] bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
    </span>
  )
}