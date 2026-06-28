import { IconStar, IconQuote } from './Icons'

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <IconStar key={i} className="text-rose" />
      ))}
    </div>
  )
}

export default function TestimonialSlider({ testimonials }) {
  const doubled = [...testimonials, ...testimonials]

  return (
    <div className="relative overflow-hidden">
      {/* fade masks */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10"
        style={{ background: 'linear-gradient(to right, rgb(250,250,250) 0%, transparent 100%)' }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10"
        style={{ background: 'linear-gradient(to left, rgb(250,250,250) 0%, transparent 100%)' }}
      />

      <div className="flex gap-5 testimonial-slider">
        {doubled.map((t, i) => (
          <figure
            key={i}
            className="flex-shrink-0 w-[360px] bg-white rounded-[24px] p-7 shadow-card flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <Stars />
              <span className="text-rose/20">
                <IconQuote />
              </span>
            </div>
            <blockquote className="text-[0.98rem] font-medium leading-[1.7] text-charcoal flex-1">
              {t.text}
            </blockquote>
            <figcaption className="mt-5 pt-4 border-t border-[#CED7E4]">
              <p className="text-sm text-muted font-medium">{t.detail}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
