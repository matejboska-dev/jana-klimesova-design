import { motion, useReducedMotion } from 'motion/react'
import React from 'react'

const EASE = [0.21, 0.47, 0.32, 0.98]

type RevealDirection = 'bottom' | 'left' | 'right' | 'scale' | 'clip'

const VARIANTS: Record<RevealDirection, (y: number) => { hidden: any; show: any }> = {
  bottom: (y) => ({
    hidden: { opacity: 0, y },
    show:   { opacity: 1, y: 0 },
  }),
  left: (y) => ({
    hidden: { opacity: 0, x: -y },
    show:   { opacity: 1, x: 0 },
  }),
  right: (y) => ({
    hidden: { opacity: 0, x: y },
    show:   { opacity: 1, x: 0 },
  }),
  scale: () => ({
    hidden: { opacity: 0, scale: 0.93 },
    show:   { opacity: 1, scale: 1 },
  }),
  clip: () => ({
    hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
    show:   { opacity: 1, clipPath: 'inset(0 0% 0 0)' },
  }),
}

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  y?: number
  from?: RevealDirection
  as?: string
  margin?: string
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  y = 30,
  from = 'bottom',
  as = 'div',
  margin = '-80px',
}: RevealProps) {
  const reduce = useReducedMotion()
  const MotionTag = (motion as any)[as] || motion.div

  if (reduce) {
    const Tag = as as any
    return <Tag className={className}>{children}</Tag>
  }

  const { hidden, show } = VARIANTS[from]?.(y) ?? VARIANTS.bottom(y)

  return (
    <MotionTag
      className={className}
      initial={hidden}
      whileInView={show}
      viewport={{ once: true, margin }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  )
}
