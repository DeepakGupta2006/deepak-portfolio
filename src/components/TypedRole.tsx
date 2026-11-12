import { useEffect, useState } from 'react'

const ROLES = [
  'Full Stack Developer',
  'Software Developer',
  'AI/ML',
  'Mern Stack Developer',
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
      <span className="mr-2 t-accent3 font-normal">&gt;</span>
      <span className="gradient-text">{text}</span>
      <span
        className="ml-1 inline-block w-[2.5px] h-[0.95em] animate-pulse"
        style={{
          background: "var(--accent)",
          boxShadow: "0 0 8px var(--accent)",
        }}
      />
    </span>
  )
}