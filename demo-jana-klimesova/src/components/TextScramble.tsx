import { useEffect, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

interface TextScrambleProps {
  children: string
  className?: string
  trigger?: boolean
  speed?: number
  duration?: number
}

export default function TextScramble({
  children,
  className = '',
  trigger = true,
  speed = 0.04,
  duration = 0.7,
}: TextScrambleProps) {
  const text = children
  const [display, setDisplay] = useState(text)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!trigger || running) return
    setRunning(true)
    const steps = Math.round(duration / speed)
    let step = 0
    const id = setInterval(() => {
      const progress = step / steps
      let out = ''
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          out += ' '
          continue
        }
        if (progress * text.length > i) {
          out += text[i]
        } else {
          out += CHARS[Math.floor(Math.random() * CHARS.length)]
        }
      }
      setDisplay(out)
      step++
      if (step > steps) {
        clearInterval(id)
        setDisplay(text)
        setRunning(false)
      }
    }, speed * 1000)
    return () => clearInterval(id)
  }, [trigger, duration, speed, text, running])

  return <span className={className}>{display}</span>
}
