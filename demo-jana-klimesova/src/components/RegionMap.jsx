import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

import kvStreet from '../assets/kv-street.jpg'
import propKitchen2 from '../assets/prop-kitchen-2.jpg'
import propCottage from '../assets/prop-cottage.jpg'

// property listing pins placed on their actual locations relative to the Google Map embed
const pins = [
  {
    left: '53.5%',
    top: '53%',
    img: kvStreet,
    type: 'Byt 3+kk',
    place: 'Karlovy Vary, Zámecký vrch',
    area: '72 m²',
    price: '3 999 999 Kč',
  },
  {
    left: '45.5%',
    top: '45%',
    img: propKitchen2,
    type: 'Byt 4+kk',
    place: 'Karlovy Vary, Rybáře',
    area: '87 m²',
    price: '4 900 000 Kč',
  },
  {
    left: '48%',
    top: '20%',
    img: propCottage,
    type: 'Chata',
    place: 'Hroznětín, Velký Rybník',
    area: '42 m²',
    price: '2 250 000 Kč',
  },
]

export default function RegionMap() {
  const [active, setActive] = useState(null)
  const reduce = useReducedMotion()

  return (
    <div
      className="relative w-full aspect-[5/3] select-none rounded-[30px] overflow-hidden border border-border bg-offwhite shadow-card"
      onClick={() => setActive(null)}
    >
      {/* Google Map Embed */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83504.67420976465!2d12.782094266417875!3d50.21704811050448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a099405da94d43%3A0x284baf8a43d431d0!2sKarlovy%20Vary!5e1!3m2!1sen!2scz!4v1782641418087!5m2!1sen!2scz"
        className="absolute inset-0 w-full h-full border-0"
        style={{
          filter: 'grayscale(100%) brightness(0.95) contrast(1.15)',
          pointerEvents: 'none',
        }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        title="Mapa Karlovy Vary"
      />

      {/* Pink Color Tint Overlay (Mix Blend Multiply & Color) */}
      <div
        className="absolute inset-0 bg-[#D98A9B] opacity-[0.16] pointer-events-none"
        style={{ mixBlendMode: 'color' }}
      />
      <div
        className="absolute inset-0 bg-[#D98A9B] opacity-[0.05] pointer-events-none"
        style={{ mixBlendMode: 'multiply' }}
      />

      {/* Decorative subtle border shadow inside map */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_4px_24px_rgba(0,0,0,0.06)] rounded-[30px]" />

      {/* HTML property pins */}
      {pins.map((p, i) => {
        const isOn = active === i
        return (
          <button
            key={i}
            type="button"
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group"
            style={{ left: p.left, top: p.top }}
            onMouseEnter={() => !reduce && setActive(i)}
            onMouseLeave={() => !reduce && setActive((cur) => (cur === i ? null : cur))}
            onClick={(e) => {
              e.stopPropagation()
              setActive(isOn ? null : i)
            }}
            aria-label={`${p.type}, ${p.place}`}
          >
            {!reduce && (
              <span className="absolute inset-0 m-auto h-5 w-5 rounded-full bg-rose/40 animate-ping" />
            )}
            <span className={`relative block h-5 w-5 rounded-full bg-rose border-2 border-white shadow-[0_4px_12px_rgba(217,138,155,0.6)] transition-transform duration-200 ${isOn ? 'scale-125' : 'group-hover:scale-110'}`} />

            {/* flip-up card */}
            <motion.div
              className="absolute left-1/2 bottom-full mb-3 w-56 origin-bottom pointer-events-none"
              style={{ x: '-50%' }}
              initial={false}
              animate={isOn ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : { opacity: 0, y: 8, rotateX: -35, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.22)] border border-black/5 text-left">
                <div className="relative h-28 overflow-hidden">
                  <img src={p.img} alt="" className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 text-[0.6rem] font-semibold uppercase tracking-[0.12em] bg-rose text-white px-2 py-0.5 rounded-full">Prodej</span>
                </div>
                <div className="p-3.5">
                  <p className="font-display font-extrabold text-black text-[1rem] leading-tight">{p.type}</p>
                  <p className="text-xs text-muted mt-0.5">{p.place}</p>
                  <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-black/5">
                    <span className="text-xs text-muted">{p.area}</span>
                    <span className="text-sm font-bold text-rose">{p.price}</span>
                  </div>
                </div>
              </div>
              <span className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-white rotate-45 border-r border-b border-black/5" />
            </motion.div>
          </button>
        )
      })}
    </div>
  )
}


