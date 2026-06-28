import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

interface MagneticButtonProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  className?: string
  distance?: number
  as?: 'a' | 'button' | 'div' | string
  href?: string
  type?: 'submit' | 'reset' | 'button'
}

export default function MagneticButton({
  children,
  className = '',
  distance = 0.5,
  as = 'a',
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement & HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { damping: 15, stiffness: 200, mass: 0.1 })
  const springY = useSpring(y, { damping: 15, stiffness: 200, mass: 0.1 })

  function onMouseMove(e: React.MouseEvent) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * distance)
    y.set((e.clientY - cy) * distance)
  }

  function onMouseLeave() {
    x.set(0)
    y.set(0)
  }

  // Typecast motion element dynamically
  const Tag = (motion as any)[as] || motion.a

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </Tag>
  )
}
