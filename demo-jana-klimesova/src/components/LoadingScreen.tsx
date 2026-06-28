import { motion } from 'motion/react'

// navy curtain intro — rose line fills, name unmasks, curtain exits upward
export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-navy text-white"
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.span
        className="text-[0.7rem] uppercase tracking-[0.28em] text-rose mb-7"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        RE/MAX Glorion · Karlovy Vary
      </motion.span>

      <div className="overflow-hidden">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold leading-none tracking-tight"
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          transition={{ delay: 0.35, duration: 0.85, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          Jana Klimešová
        </motion.h1>
      </div>

      <motion.div
        className="mt-8 h-px bg-rose"
        initial={{ width: 0 }}
        animate={{ width: 220 }}
        transition={{ delay: 0.5, duration: 1.1, ease: 'easeInOut' }}
      />

      <motion.span
        className="mt-4 text-[0.7rem] uppercase tracking-[0.28em] text-white/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        Realitní makléřka
      </motion.span>
    </motion.div>
  )
}
