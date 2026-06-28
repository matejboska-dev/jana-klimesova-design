import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

import propKitchen2 from '../assets/prop-kitchen-2.jpg'
import erImage from '../assets/er.webp'

// stress notes that pile up on the "you alone" side
const chaosNotes = [
  { t: 'Cizí lidé ve Vašem domě', x: '6%', y: '16%', r: -5 },
  { t: 'Telefonáty ve 22:00', x: '22%', y: '33%', r: 4 },
  { t: 'Kdo přijde na prohlídku?', x: '4%', y: '50%', r: -3 },
  { t: 'Hromada papírů', x: '24%', y: '63%', r: 5 },
  { t: 'Smlouvání o ceně', x: '8%', y: '78%', r: -4 },
]

export default function SplitCompare() {
  const [div, setDiv] = useState(50)
  const ref = useRef(null)
  const dragging = useRef(false)

  const setFromX = (clientX) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    const pctv = ((clientX - r.left) / r.width) * 100
    setDiv(Math.max(12, Math.min(88, pctv)))
  }

  useEffect(() => {
    const move = (e) => dragging.current && setFromX(e.clientX)
    const up = () => { dragging.current = false }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="relative w-full aspect-[16/11] sm:aspect-[16/9] rounded-[30px] overflow-hidden shadow-card cursor-ew-resize select-none"
      style={{ touchAction: 'pan-y' }}
      onPointerDown={(e) => { dragging.current = true; setFromX(e.clientX) }}
    >
      {/* ── CHAOS (bottom layer, full) ── */}
      <div className="absolute inset-0">
        <img src={propKitchen2} alt="" className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.55]" draggable="false" />
        <div className="absolute inset-0 bg-black/30" />

        <span className="absolute top-5 left-5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/60 border border-white/25 px-3 py-1.5 rounded-full">
          Vy sami
        </span>

        {chaosNotes.map((n, i) => (
          <motion.div
            key={n.t}
            className="absolute bg-white/95 text-black text-[0.72rem] sm:text-sm font-medium px-3 py-2 rounded-lg shadow-lg max-w-[160px]"
            style={{ left: n.x, top: n.y, rotate: `${n.r}deg` }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
          >
            <span className="absolute -left-1 -top-1 h-2.5 w-2.5 rounded-full bg-rose" />
            {n.t}
          </motion.div>
        ))}
      </div>

      {/* ── CALM (top layer, clipped to the right of divider) ── */}
      <div
        className="absolute inset-0 bg-black flex items-center justify-end overflow-hidden"
        style={{ clipPath: `inset(0 0 0 ${div}%)` }}
      >
        {/* Grayscale background image er.webp matched to the left side's look */}
        <img
          src={erImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.55]"
          style={{ objectPosition: '40% center' }}
          draggable="false"
        />
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />

        <span className="absolute top-5 right-5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-rose border border-rose/30 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
          Se mnou
        </span>

        <div className="relative z-10 w-1/2 min-w-[260px] px-6 sm:px-10 flex flex-col items-center text-center">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-rose mb-3">Na Vás zůstane</p>
          <h3 className="font-display font-extrabold text-white leading-[0.9] tracking-tight" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}>
            Jen
            <br />
            podpis.
          </h3>
          {/* signature squiggle */}
          <svg className="mt-3 w-40 overflow-visible" height="22" viewBox="0 0 200 22" fill="none" aria-hidden="true">
            <path d="M4,14 C24,4 36,20 56,11 C78,1 92,18 116,10 C140,2 156,16 196,7" stroke="#D98A9B" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <p className="mt-4 text-sm text-white/70 font-medium max-w-[28ch]">Zbytek nechte na mně. Prohlídky, papíry i vyjednávání.</p>
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div className="absolute inset-y-0 z-20 pointer-events-none" style={{ left: `${div}%` }}>
        <div className="absolute inset-y-0 -translate-x-1/2 w-[2px] bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.25)]" />
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white shadow-[0_6px_20px_rgba(0,0,0,0.25)] flex items-center justify-center">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M9 6l-4 5 4 5M13 6l4 5-4 5" stroke="#D98A9B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* drag hint */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-white/70 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
      >
        Přetáhněte a porovnejte
      </motion.div>
    </div>
  )
}
