import { useEffect, useState } from 'react'

const ROLES = [
  'full Stack Developer',
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
    const speed = isPausing ? 1400 : deleting ? 35 : 60

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
    <span className="text-cyan-soft">
      {text}
      <span className="ml-0.5 inline-block w-[2px] animate-blink bg-cyan-soft align-middle h-[0.9em]" />
    </span>
  )
}