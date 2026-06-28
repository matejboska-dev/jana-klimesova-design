import { motion } from 'motion/react'
import { IconPin, IconArrowUpRight } from './Icons'

interface PropertyCardProps {
  img: string
  type: string
  place: string
  area: string
  price: string
  tag: string
  index?: number
}

export default function PropertyCard({
  img,
  type,
  place,
  area,
  price,
  tag,
  index = 0,
}: PropertyCardProps) {
  return (
    <motion.article
      className="group relative overflow-hidden rounded-[24px] cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={{ aspectRatio: '3/4' }}
    >
      {/* image */}
      <img
        src={img}
        alt={`${type}, ${place}`}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* permanent gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />

      {/* tag */}
      <span className="absolute top-4 left-4 bg-rose text-white text-[0.62rem] font-semibold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full z-10">
        {tag}
      </span>

      {/* static bottom info (always visible) */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transition-all duration-500 group-hover:-translate-y-16">
        <div className="flex items-center gap-1.5 text-white/70 text-xs mb-1">
          <IconPin width={12} height={12} className="text-rose flex-shrink-0" />
          {place}
        </div>
        <h3 className="text-white font-bold text-[1.2rem]">{type}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-white/60 text-sm">{area}</span>
          <span className="text-rose font-bold text-[1.1rem]">{price}</span>
        </div>
      </div>

      {/* hover CTA — slides up from bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0">
        <a
          href="https://www.remax-czech.cz/reality/nemovitosti-maklere/11756/jana-klimesova/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-white text-navy font-semibold py-3.5 rounded-full text-sm hover:bg-offwhite transition-colors"
        >
          Zobrazit detail
          <IconArrowUpRight width={16} height={16} />
        </a>
      </div>
    </motion.article>
  )
}
