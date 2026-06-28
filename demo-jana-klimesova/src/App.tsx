import React, { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from 'motion/react'

import LoadingScreen from './components/LoadingScreen'
import Reveal from './components/Reveal'
import CountUp from './components/CountUp'
import Marquee from './components/Marquee'
import TextScramble from './components/TextScramble'
import MagneticButton from './components/MagneticButton'
import PropertyCard from './components/PropertyCard'
import TestimonialSlider from './components/TestimonialSlider'
import RegionMap from './components/RegionMap'
import SplitCompare from './components/SplitCompare'
import {
  IconCamera,
  IconDoc,
  IconKey,
  IconShield,
  IconCompass,
  IconArrow,
  IconArrowUpRight,
  IconPhone,
  IconMail,
  IconPin,
  IconStar,
  IconQuote,
} from './components/Icons'

import kvStreet from './assets/kv-street.jpg'
import propDining from './assets/prop-dining.jpg'
import propCottage from './assets/prop-cottage.jpg'
import propKitchen2 from './assets/prop-kitchen-2.jpg'

/* ---------- DATA ---------- */
const PHONE = '+420 608 526 462'
const PHONE_HREF = 'tel:+420608526462'
const EMAIL = 'jana.klimesova@re-max.cz'

const regions = [
  'Karlovy Vary',
  'Jáchymov',
  'Ostrov',
  'Hroznětín',
  'Žlutice',
  'Stráž nad Ohří',
  'Stará Role',
  'Rybáře',
  'Drahovice',
  'Merklín',
  'Rotava',
]

const stats = [
  { value: 5, suffix: ',0', label: 'Průměrné hodnocení klientů' },
  { value: 35, suffix: '+', label: 'Nemovitostí v nabídce' },
  { value: 10, suffix: '+', label: 'Měst a obcí v regionu' },
  { value: 6, suffix: '', label: 'Doporučení od prodávajících' },
]

interface StepItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  number: string
  title: string
  text: string
}

const steps: StepItem[] = [
  {
    icon: IconCompass,
    number: '01',
    title: 'Ocenění a strategie',
    text: 'Přijedu za Vámi, prohlédnu nemovitost a navrhnu reálnou prodejní cenu podle skutečného trhu v Karlových Varech a okolí. Domluvíme společný plán.',
  },
  {
    icon: IconCamera,
    number: '02',
    title: 'Příprava a prezentace',
    text: 'Připravím dům na profesionální focení tak, aby se prodával takřka sám, a zajistím inzerci ve více prodejních kanálech najednou.',
  },
  {
    icon: IconKey,
    number: '03',
    title: 'Prohlídky vedu za Vás',
    text: 'Se zájemci jednám sama. Vy u prohlídek být nemusíte a nikdo Vám nebude chodit po domě a snižovat cenu. Tu tíhu nesu za Vás.',
  },
  {
    icon: IconDoc,
    number: '04',
    title: 'Právní servis a předání',
    text: 'Zajistím smlouvy, servis na katastru, notářskou úschovu i bezpečné předání klíčů novému majiteli. Na Vás zůstane jen podpis.',
  },
]

const guarantees = [
  'Místní znalost regionu Karlovarska',
  'Profesionální focení a home staging',
  'Inzerce ve více kanálech najednou',
  'Kompletní právní a smluvní servis',
  'Notářská úschova a bezpečné předání',
  'Osobní zastoupení po celou dobu',
]

const listings = [
  {
    img: kvStreet,
    type: 'Byt 3+kk',
    place: 'Karlovy Vary, Zámecký vrch',
    area: '72 m²',
    price: '3 999 999 Kč',
    tag: 'Prodej',
  },
  {
    img: propKitchen2,
    type: 'Byt 4+kk',
    place: 'Karlovy Vary, Rybáře',
    area: '87 m²',
    price: '4 900 000 Kč',
    tag: 'Prodej',
  },
  {
    img: propCottage,
    type: 'Chata',
    place: 'Hroznětín, Velký Rybník',
    area: '42 m²',
    price: '2 250 000 Kč',
    tag: 'Prodej',
  },
]

const testimonials = [
  {
    text: 'Zohlednila moje požadavky i potřeby zájemců o koupi domu, je velmi zkušená a empatická. Děkuji za opravdu lidský přístup a ohromné nasazení, které nakonec uspokojilo obě strany.',
    detail: 'Prodej rodinného domu',
  },
  {
    text: 'Od prvního setkání až po předání bytu novým majitelům jsme byli velmi spokojeni. Vždy byla k dispozici, vždy nás informovala a komunikace byla naprosto bezvadná. Rádi doporučíme.',
    detail: 'Prodej bytu',
  },
  {
    text: 'Byl jsem moc spokojen, paní Klimešová mi pomohla ve svízelné situaci. Ještě jednou děkuji.',
    detail: 'Josef Kepka',
  },
  {
    text: 'Informovanost, rychlý a kvalitní prodej, usměvavá, příjemná a ochotná. Vše proběhlo k mé naprosté spokojenosti.',
    detail: 'Prodej bytu',
  },
]

/* ---------- HELPERS ---------- */
interface StarsProps {
  className?: string
}

function Stars({ className = '' }: StarsProps) {
  return (
    <div className={`flex gap-0.5 text-rose ${className}`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <IconStar key={i} />
      ))}
    </div>
  )
}

interface EyebrowProps {
  children: React.ReactNode
  light?: boolean
}

function Eyebrow({ children, light = false }: EyebrowProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className={`h-px w-9 ${light ? 'bg-rose/60' : 'bg-rose'}`} />
      <span
        className={`text-[0.72rem] font-medium uppercase tracking-[0.2em] ${
          light ? 'text-rose/80' : 'text-rose'
        }`}
      >
        {children}
      </span>
    </div>
  )
}

/* ---------- NAV LINK with scramble ---------- */
interface NavLinkProps {
  href: string
  children: string
}

function NavLink({ href, children }: NavLinkProps) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      className="relative hover:text-rose transition-colors duration-150 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <TextScramble trigger={hovered} duration={0.5} speed={0.03}>
        {children}
      </TextScramble>
      <span className="absolute -bottom-0.5 left-0 h-px bg-rose w-0 group-hover:w-full transition-all duration-300" />
    </a>
  )
}

/* ---------- NAV ---------- */
function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setSolid(v > 80))

  const links = [
    ['#o-mne', 'O mně'],
    ['#region', 'Region'],
    ['#pristup', 'Přístup'],
    ['#nabidka', 'Nabídka'],
    ['#reference', 'Reference'],
  ]

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-white border-b border-[#CED7E4] transition-all duration-300 ${
        solid ? 'py-3 shadow-sm' : 'py-5'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 flex items-center justify-between">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="text-[1.1rem] font-bold tracking-tight text-navy leading-none">
            Jana Klimešová
          </span>
          <span className="hidden sm:inline text-[0.6rem] font-medium uppercase tracking-[0.2em] text-rose">
            RE/MAX
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7 text-[0.95rem] font-normal text-charcoal">
          {links.map(([href, label]) => (
            <NavLink key={href} href={href}>
              {label}
            </NavLink>
          ))}
        </nav>

        <MagneticButton
          as="a"
          href="#kontakt"
          distance={0.3}
          className="hidden lg:inline-flex items-center gap-2 bg-rose text-white text-[0.9rem] font-medium pl-6 pr-5 py-3 rounded-full hover:bg-rose-hover transition-colors duration-200"
        >
          Konzultace zdarma
          <IconArrow width={15} height={15} className="opacity-80" />
        </MagneticButton>

        <button
          className="lg:hidden text-navy p-1"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          <span className="block w-6 h-[2px] bg-navy mb-1.5" />
          <span className="block w-6 h-[2px] bg-navy mb-1.5" />
          <span className="block w-4 h-[2px] bg-navy" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-white border-t border-[#CED7E4] mt-3"
          >
            <div className="px-6 py-5 flex flex-col gap-3 text-charcoal">
              {links.map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="py-1.5 text-[1rem] hover:text-rose transition-colors"
                >
                  {label}
                </a>
              ))}
              <a
                href="#kontakt"
                onClick={() => setOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 bg-rose text-white font-medium py-3.5 rounded-full hover:bg-rose-hover transition-colors"
              >
                Konzultace zdarma
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

/* ---------- PARALLAX HELPERS ---------- */
const SPRING = { stiffness: 55, damping: 22, mass: 0.8 }

function useParallax(range: [number, number] = [-30, 30]): [React.RefObject<HTMLDivElement | null>, any] {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const raw = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : range)
  const y = useSpring(raw, SPRING)
  return [ref, y]
}

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  style?: React.CSSProperties
  range?: [number, number]
  imgClassName?: string
}

function ParallaxImage({ src, alt, className, style, range = [-25, 25], imgClassName }: ParallaxImageProps) {
  const [ref, y] = useParallax(range)
  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ''}`} style={style}>
      <motion.img src={src} alt={alt} className={`w-full h-full object-cover scale-110 ${imgClassName ?? ''}`} style={{ y }} />
    </div>
  )
}

interface ParallaxLayerProps {
  children: React.ReactNode
  range?: [number, number]
  className?: string
  style?: React.CSSProperties
}

function ParallaxLayer({ children, range = [-18, 18], className, style }: ParallaxLayerProps) {
  const [ref, y] = useParallax(range)
  return (
    <motion.div ref={ref} style={{ y, ...style }} className={className}>
      {children}
    </motion.div>
  )
}

/* ---------- HERO ---------- */
interface HeroProps {
  ready: boolean
}

function Hero({ ready }: HeroProps) {
  const reduce = useReducedMotion()
  const show = reduce ? true : ready
  const { scrollY } = useScroll()
  const bgY = useTransform(scrollY, [0, 700], ['0%', '18%'])

  const tags = ['Certifikovaná makléřka', 'RE/MAX Glorion', 'Karlovarský kraj']

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  }
  const fadeUp = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.21, 0.47, 0.32, 0.98] as const } },
  }

  const draw = (delay: number) => ({
    hidden: { pathLength: 0, opacity: 0 },
    show: {
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration: 1.1, delay, ease: [0.45, 0, 0.55, 1] as const }, opacity: { duration: 0.01, delay } },
    },
  })

  const FRAMER_IMG = "https://framerusercontent.com/images/uto3XPrnaAzb6Kww3z8RfyUcvcs.png?width=1920&height=1080"

  return (
    <section
      id="top"
      className="relative overflow-hidden flex flex-col bg-white"
    >
      {/* ── DESKTOP ONLY: background image parallax ── */}
      <motion.div
        className="hidden lg:block absolute inset-y-0 right-0 left-1/2 scale-110 overflow-hidden"
        style={{ y: bgY }}
      >
        <img src={FRAMER_IMG} alt="" className="w-full h-full object-cover object-center" crossOrigin="anonymous" />
      </motion.div>

      {/* Grain noise */}
      <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <filter id="hero-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-grain)" opacity="0.06" />
      </svg>

      {/* ── MOBILE ONLY: portrait as inline image ── */}
      <motion.div
        className="lg:hidden relative z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : {}}
        transition={{ duration: 0.7 }}
      >
        <img
          src={FRAMER_IMG}
          alt="Jana Klimešová"
          className="w-full object-cover object-[center_8%]"
          style={{ aspectRatio: '3/2.8' }}
          crossOrigin="anonymous"
        />
      </motion.div>

      {/* ── Content wrapper ── */}
      <motion.div
        className={[
          'relative z-10 px-6 lg:px-14 xl:px-20 pb-10 lg:pb-0',
          /* mobile: natural flow, white bg */
          'pt-6 bg-white',
          /* desktop: full-height cinematic */
          'lg:pt-28 lg:bg-transparent lg:flex lg:flex-col lg:justify-between lg:min-h-[100svh]',
        ].join(' ')}
        variants={stagger}
        initial="hidden"
        animate={show ? 'show' : 'hidden'}
      >
        {/* TOP: tags · subtitle · CTAs */}
        <div className="flex flex-col gap-5 lg:gap-6 max-w-2xl">
          {/* pill tags */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#0D0D0D] bg-white/90 border border-black/10 px-3.5 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* subtitle */}
          <motion.div variants={fadeUp} className="text-charcoal text-[1rem] lg:text-[1.2rem] leading-[1.65] max-w-[46ch]">
            <span>Vaši nemovitost prodám rychleji a za více.</span>
            <span className="block font-semibold text-black relative w-fit mt-0.5 lg:mt-1">
              Jsem odsud – vyznám se tu.
              <motion.svg
                className="absolute -bottom-1.5 left-0 w-full overflow-visible pointer-events-none"
                height="8" viewBox="0 0 220 8" fill="none" preserveAspectRatio="none"
                aria-hidden="true"
              >
                <motion.path
                  d="M2,5 C30,1 58,7 88,4 C118,1 148,7 178,4 C198,2 210,6 218,4"
                  stroke="#D98A9B" strokeWidth="2.2" strokeLinecap="round"
                  variants={draw(0.9) as any}
                />
              </motion.svg>
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
            <MagneticButton
              as="a"
              href="#kontakt"
              distance={0.4}
              className="group inline-flex items-center justify-center gap-2 bg-rose text-white font-medium px-7 py-3.5 rounded-full hover:bg-rose-hover transition-colors duration-200"
            >
              Konzultace zdarma
              <IconArrow width={16} height={16} className="transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-2 border border-black/20 text-black font-medium px-7 py-3.5 rounded-full hover:bg-black hover:text-white transition-colors duration-200"
            >
              <IconPhone width={16} height={16} />
              608 526 462
            </a>
          </motion.div>

          {/* stars */}
          <motion.div variants={fadeUp} className="flex items-center gap-2.5">
            <Stars />
            <span className="text-muted text-sm">Hodnocení 5,0 od klientů</span>
          </motion.div>
        </div>

        {/* BOTTOM: massive name */}
        <motion.div variants={fadeUp} className="mt-10 lg:mt-8 relative">
          <h1
            className="relative font-display font-extrabold uppercase leading-none tracking-[-0.03em] select-none text-black"
            style={{
              fontSize: 'clamp(2.8rem, 10.5vw, 11rem)',
              lineHeight: 0.85,
              textShadow: '0 0 80px rgba(255, 255, 255, 1), 0 0 40px rgba(255, 255, 255, 0.9), 0 0 15px rgba(255, 255, 255, 0.7)',
            }}
          >
            Jana<br />Klimešová
          </h1>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        className="absolute bottom-6 right-8 flex flex-col items-center gap-2 text-black/35 z-10"
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : {}}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <span className="text-[0.58rem] font-medium uppercase tracking-[0.22em] rotate-90 mb-1">Scroll</span>
        <span className="scroll-pulse w-px h-8 bg-black/15" />
      </motion.div>
    </section>
  )
}

/* ---------- APP ---------- */
export default function App() {
  const reduce = useReducedMotion()
  const [loading, setLoading] = useState(!reduce)
  const [ready, setReady] = useState(!!reduce)
  const { scrollYProgress } = useScroll()
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (!loading) return
    const t = setTimeout(() => setLoading(false), 2300)
    return () => clearTimeout(t)
  }, [loading])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="bg-white text-charcoal overflow-x-hidden">
      <AnimatePresence onExitComplete={() => setReady(true)}>
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {/* scroll progress line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-rose origin-left z-[60]"
        style={{ scaleX: scrollYProgress }}
      />

      <Nav />
      <Hero ready={ready} />

      {/* ─── REGION MARQUEE ─── */}
      <section className="relative border-y border-navy/10 bg-navy text-white py-5 overflow-hidden">
        <Marquee items={regions} className="text-white" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-navy to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-navy to-transparent" />
      </section>

      {/* ─── STATS ─── */}
      <section className="bg-white border-b border-[#E8EEF5] lg:min-h-[100svh] lg:flex lg:flex-col lg:justify-center py-20 lg:py-0">
        <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#E8EEF5]">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className={`px-6 lg:px-10 py-4 ${i === 0 ? 'pl-0' : ''} ${i === stats.length - 1 ? 'pr-0' : ''}`}>
                  <span className="block h-0.5 w-8 bg-rose mb-5" />
                  <div
                    className="font-extrabold text-navy leading-none tracking-tight tabular-nums"
                    style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)' }}
                  >
                    <CountUp target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-3 text-[0.76rem] text-muted leading-snug uppercase tracking-[0.1em] max-w-[18ch]">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── O MNĚ ─── */}
      <section id="o-mne" className="py-28 lg:py-0 bg-offwhite lg:min-h-[100svh] lg:flex lg:flex-col lg:justify-center">
        <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">

          {/* image */}
          <Reveal from="left" className="relative order-2 lg:order-1">
            <ParallaxImage
              src={kvStreet}
              alt="Lázeňská architektura v Karlových Varech"
              className="rounded-[30px] shadow-card"
              imgClassName="rounded-[30px]"
              style={{ maxHeight: 580 }}
              range={[-30, 10]}
            />
            <ParallaxLayer range={[8, -12]} className="absolute bottom-6 -right-3 lg:-right-8 bg-white rounded-[20px] px-6 py-5 shadow-card-hover max-w-[200px]">
              <p className="text-[1.3rem] font-extrabold text-navy leading-tight">Místní makléřka</p>
              <p className="text-sm text-muted mt-1">Karlovarsko znám dům od domu.</p>
            </ParallaxLayer>
          </Reveal>

          {/* text */}
          <div className="order-1 lg:order-2">
            <Reveal from="right">
              <Eyebrow>Proč právě já</Eyebrow>
            </Reveal>
            <Reveal from="right" delay={0.05}>
              <h2 className="text-h2 font-extrabold text-navy leading-tight tracking-tight">
                Jsem odsud.{' '}
                <span className="text-rose">A to je Váš náskok.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-7 space-y-4 text-[1.05rem] text-muted leading-[1.7] max-w-lg">
                <p>
                  Jmenuji se <strong className="text-charcoal font-semibold">Jana Klimešová</strong> a
                  jsem realitní makléřka kanceláře RE/MAX Glorion. Působím tam, kde to znám
                  nejlépe, v Karlových Varech a okolních obcích.
                </p>
                <p>
                  Vím, kde se v regionu dobře prodává, jaká je reálná cena a kdo jsou
                  lidé, kteří tu hledají nový domov. Tahle znalost Vám ušetří čas i peníze.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 grid grid-cols-2 gap-y-3 gap-x-4 max-w-md">
                {[
                  'Specializace na prodej',
                  'Byty, domy i komerce',
                  'Karlovy Vary a okolí',
                  'Osobní přístup ke každému',
                ].map((t) => (
                  <div key={t} className="flex items-start gap-2.5 text-sm text-charcoal">
                     <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-rose flex-shrink-0" />
                    {t}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── JSEM ODSUD — interactive map ─── */}
      <section id="region" className="py-28 lg:py-0 bg-white border-t border-[#E8EEF5] overflow-hidden lg:min-h-[100svh] lg:flex lg:flex-col lg:justify-center">
        <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-4">
              <Reveal from="left">
                <Eyebrow>Jsem odsud</Eyebrow>
              </Reveal>
              <Reveal from="left" delay={0.05}>
                <h2 className="text-h2 font-extrabold text-navy leading-tight tracking-tight">
                  Můj region.
                  <span className="block text-rose">Ne jen tabulka na mapě.</span>
                </h2>
              </Reveal>
              <Reveal from="left" delay={0.1}>
                <p className="mt-6 text-[1.05rem] text-muted leading-[1.7] max-w-md">
                  Karlovy Vary a okolní obce znám dům od domu. Vím, kde se dobře prodává,
                  kde lidé hledají a jaká je reálná cena ulici od ulice. Tuhle znalost
                  z Prahy nikdo nedoveze.
                </p>
              </Reveal>
              <Reveal from="left" delay={0.15}>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                  <span className="flex items-center gap-2 text-charcoal">
                    <span className="h-3.5 w-3.5 rounded-full bg-rose border-2 border-white shadow-sm" />
                    Aktuální nabídka
                  </span>
                  <span className="flex items-center gap-2 text-muted">
                    <span className="h-2.5 w-2.5 rounded-full border-2 border-black/40" />
                    Působím v regionu
                  </span>
                </div>
              </Reveal>
              <Reveal from="left" delay={0.2}>
                <p className="mt-6 text-xs text-muted/80 italic">
                  Najeďte na špendlík a podívejte se na nemovitost.
                </p>
              </Reveal>
            </div>

            <Reveal from="right" delay={0.1} className="lg:col-span-8">
              <RegionMap />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── PŘÍSTUP — dark section ─── */}
      <section id="pristup" className="relative py-28 lg:py-0 bg-navy text-white overflow-hidden lg:min-h-[100svh] lg:flex lg:flex-col lg:justify-center">
        {/* background watermark — parallax drift */}
        <ParallaxLayer
          range={[-40, 40]}
          className="pointer-events-none absolute -bottom-8 right-0 text-[18vw] font-extrabold text-white/[0.03] leading-none select-none tracking-tighter"
          aria-hidden="true"
        >
          KV
        </ParallaxLayer>

        <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-14 items-center relative">

          <div className="lg:col-span-7">
            <Reveal from="left">
              <Eyebrow light>Můj přístup</Eyebrow>
            </Reveal>
            <Reveal from="left" delay={0.05}>
              <h2 className="text-h2 font-extrabold text-white leading-tight tracking-tight">
                Prodat domov je těžké.
                <span className="block text-rose">Tu tíhu nesu za Vás.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 space-y-4 text-[1.05rem] text-white/65 leading-[1.75] max-w-xl">
                <p>
                  Představte si, že prodáváte svůj dům. Vyrůstali jste v něm, vyrůstaly
                  v něm i Vaše děti. A teď máte hodiny trávit s cizími lidmi, kteří
                  chodí po Vašem území a komentují každý nedostatek jen proto, aby stlačili cenu.
                </p>
                <p className="text-white/90 font-medium">
                  Tohle všechno se mnou nezažijete. Nahradím Vás ve Vašem milovaném domě
                  a na Vás zůstane jen podpis.
                </p>
              </div>
            </Reveal>

            {/* benefit pills */}
            <Reveal delay={0.12}>
              <div className="mt-8 flex flex-wrap gap-2">
                {['Bez stresu', 'Bez zbytečných návštěv', 'Bez zdlouhavých papírů', 'Jen podpis'].map((pill) => (
                  <span
                    key={pill}
                    className="text-[0.78rem] font-medium px-4 py-2 rounded-full border border-white/20 text-white/70 hover:border-rose hover:text-rose transition-colors duration-200 cursor-default"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <MagneticButton
                as="a"
                href="#kontakt"
                distance={0.35}
                className="mt-9 inline-flex items-center gap-2 bg-rose text-white font-medium px-8 py-4 rounded-full hover:bg-rose-hover transition-colors duration-200"
              >
                Chci konzultaci zdarma
                <IconArrow width={17} height={17} />
              </MagneticButton>
            </Reveal>
          </div>

          <Reveal from="right" delay={0.1} className="lg:col-span-5">
            <div className="relative">
              <ParallaxImage
                src={propDining}
                alt="Útulný interiér nemovitosti"
                className="rounded-[30px] shadow-[0_40px_80px_rgba(0,0,0,0.35)] h-[420px]"
                range={[-20, 20]}
              />
              <ParallaxLayer range={[12, -8]} className="absolute -top-5 -left-5 bg-white text-navy rounded-[20px] px-5 py-4 shadow-card-hover max-w-[180px]">
                <IconShield width={26} height={26} className="text-rose" />
                <p className="mt-2 text-[1rem] font-bold leading-tight">Klid a jistota</p>
                <p className="text-xs text-muted mt-0.5">Od prvního setkání po předání klíčů.</p>
              </ParallaxLayer>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── VY vs. SE MNOU — split compare ─── */}
      <section className="py-28 lg:py-0 bg-white overflow-hidden lg:min-h-[100svh] lg:flex lg:flex-col lg:justify-center">
        <div className="w-full max-w-[1180px] mx-auto px-6 lg:px-10">
          <Reveal className="max-w-2xl mb-12">
            <Eyebrow>Vy sami vs. se mnou</Eyebrow>
            <h2 className="text-h2 font-extrabold text-navy leading-tight tracking-tight">
              Stejný prodej.
              <span className="block text-rose">Dva úplně jiné životy.</span>
            </h2>
            <p className="mt-5 text-[1.05rem] text-muted leading-[1.7] max-w-lg">
              Prodat dům svépomocí znamená stres, cizí lidi a hodiny vyjednávání.
              Se mnou na Vás zůstane jediná věc. Přesvědčte se sami.
            </p>
          </Reveal>
          <Reveal delay={0.1} from="scale">
            <SplitCompare />
          </Reveal>
        </div>
      </section>

      {/* ─── POSTUP ─── */}
      <section id="postup" className="py-28 lg:py-0 bg-offwhite lg:min-h-[100svh] lg:flex lg:flex-col lg:justify-center">
        <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-10">
          <Reveal className="max-w-2xl mb-16">
            <Eyebrow>Jak to probíhá</Eyebrow>
            <h2 className="text-h2 font-extrabold text-navy leading-tight tracking-tight">
              Prodej krok za krokem
            </h2>
            <p className="mt-5 text-[1.05rem] text-muted leading-[1.7] max-w-lg">
              Vždy víte, co se právě děje a co přijde dál. Vy se staráte o svůj život,
              o prodej se postarám já.
            </p>
          </Reveal>

          <motion.div
            className="grid md:grid-cols-2 gap-5"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.11 } } }}
          >
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  variants={{
                    hidden: { opacity: 0, y: 36, scale: 0.97 },
                    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.75, ease: [0.21, 0.47, 0.32, 0.98] } },
                  }}
                >
                  <motion.div
                    className="group h-full bg-white rounded-[30px] p-8 md:p-9 shadow-card cursor-default"
                    whileHover={{ y: -5, boxShadow: '0 24px 64px rgba(0,0,0,0.11)' }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <span className="w-12 h-12 rounded-[14px] bg-navy text-white flex items-center justify-center group-hover:bg-rose transition-colors duration-200">
                        <Icon width={22} height={22} />
                      </span>
                      <span className="text-4xl font-extrabold text-[#CED7E4] group-hover:text-rose/25 transition-colors step-number">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-[1.3rem] font-extrabold text-navy mb-3">{step.title}</h3>
                    <p className="text-muted leading-[1.7]">{step.text}</p>
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* bento guarantee grid */}
          <Reveal delay={0.1}>
            <div className="mt-8 bg-navy text-white rounded-[30px] p-8 md:p-10">
              <div className="mb-8">
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-rose/80 mb-2">
                  Vše v jedné ruce
                </p>
                <h3 className="text-[1.4rem] font-extrabold leading-tight">
                  Co pro Vás zařídím
                </h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {guarantees.map((g, i) => (
                  <motion.div
                    key={g}
                    className="flex items-center gap-3 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-rose/40 rounded-[16px] px-4 py-3.5 text-sm text-white/80 transition-all duration-200 cursor-default"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                  >
                    <span className="text-rose flex-shrink-0">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7l3.5 3.5L12 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {g}
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── NABÍDKA ─── */}
      <section id="nabidka" className="py-28 lg:py-0 bg-white border-y border-[#CED7E4] lg:min-h-[100svh] lg:flex lg:flex-col lg:justify-center">
        <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-10">
          <Reveal className="flex items-end justify-between mb-12 flex-wrap gap-5">
            <div className="max-w-xl">
              <Eyebrow>Aktuální nabídka</Eyebrow>
              <h2 className="text-h2 font-extrabold text-navy leading-tight tracking-tight">
                Nemovitosti z regionu
              </h2>
              <p className="mt-4 text-[1.05rem] text-muted leading-[1.7]">
                Ukázka z aktuální nabídky napříč Karlovarskem. Hledáte něco konkrétního? Ozvěte se, ráda poradím.
              </p>
            </div>
            <span className="text-sm text-muted font-medium">35 nemovitostí v nabídce</span>
          </Reveal>

          {/* hover-reveal portrait cards */}
          <motion.div
            className="grid md:grid-cols-3 gap-5"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.13 } } }}
          >
            {listings.map((l, i) => (
              <motion.div
                key={l.place}
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.96 },
                  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] } },
                }}
              >
                <PropertyCard {...l} index={i} />
              </motion.div>
            ))}
          </motion.div>

          <Reveal delay={0.1}>
            <a
              href="https://www.remax-czech.cz/reality/nemovitosti-maklere/11756/jana-klimesova/"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 flex items-center justify-center gap-3 border border-[#CED7E4] bg-offwhite rounded-[20px] py-5 text-charcoal font-medium hover:border-rose hover:text-rose transition-colors duration-200"
            >
              Zobrazit všech 35 nemovitostí v nabídce
              <IconArrowUpRight
                width={18}
                height={18}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ─── REFERENCE ─── */}
      <section id="reference" className="py-28 lg:py-0 bg-offwhite overflow-hidden lg:min-h-[100svh] lg:flex lg:flex-col lg:justify-center">
        <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-10 mb-14">
          <Reveal className="max-w-xl">
            <Eyebrow>Reference</Eyebrow>
            <h2 className="text-h2 font-extrabold text-navy leading-tight tracking-tight">
              Co říkají prodávající
            </h2>
            <div className="mt-5 flex items-center gap-3">
              <Stars />
              <span className="text-muted text-sm">Průměrné hodnocení 5,0</span>
            </div>
          </Reveal>
        </div>

        {/* auto-scrolling infinite slider */}
        <Reveal>
          <TestimonialSlider testimonials={testimonials} />
        </Reveal>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 lg:py-0 bg-rose text-white relative overflow-hidden lg:min-h-[100svh] lg:flex lg:flex-col lg:justify-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,255,255,0.1),_transparent_60%)]" />
        {/* watermark text */}
        <div
          className="pointer-events-none absolute -left-12 top-1/2 -translate-y-1/2 text-[20vw] font-extrabold text-white/[0.05] leading-none select-none tracking-tighter hidden lg:block"
          aria-hidden="true"
        >
          RE/MAX
        </div>
        <div className="max-w-[800px] mx-auto px-6 lg:px-10 text-center relative">
          <Reveal>
            <h2 className="text-h2 font-extrabold leading-tight tracking-tight">
              Zvažujete prodej nemovitosti?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 text-white/80 text-[1.1rem] max-w-xl mx-auto leading-[1.7]">
              Domluvíme si nezávaznou konzultaci a prohlídku. Bez závazků a bez zbytečného tlaku.
              Poradím Vám i s reálnou cenou.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-9 flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton
                as="a"
                href="#kontakt"
                distance={0.4}
                className="bg-white text-rose font-semibold px-8 py-4 rounded-full hover:bg-offwhite transition-colors duration-200"
              >
                Napsat zprávu
              </MagneticButton>
              <MagneticButton
                as="a"
                href={PHONE_HREF}
                distance={0.3}
                className="border border-white/40 text-white font-medium px-8 py-4 rounded-full hover:bg-white/10 transition-colors duration-200 inline-flex items-center justify-center gap-2"
              >
                <IconPhone width={18} height={18} />
                608 526 462
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── KONTAKT ─── */}
      <section id="kontakt" className="py-28 lg:py-0 bg-white lg:min-h-[100svh] lg:flex lg:flex-col lg:justify-center">
        <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16">

          {/* contact info */}
          <div>
            <Reveal>
              <Eyebrow>Kontakt</Eyebrow>
              <h2 className="text-h2 font-extrabold text-navy leading-tight tracking-tight">
                Ozvěte se mi
              </h2>
              <p className="mt-5 text-[1.05rem] text-muted leading-[1.7] max-w-md">
                Napište mi pár řádků nebo rovnou zavolejte. Ozvu se Vám nejpozději do 24 hodin.
              </p>
            </Reveal>

            <div className="mt-8 space-y-3">
              {[
                { Icon: IconPhone, title: PHONE, sub: 'Volejte kdykoliv přes den', href: PHONE_HREF },
                { Icon: IconMail, title: EMAIL, sub: 'Odpovím do 24 hodin', href: `mailto:${EMAIL}` },
                {
                  Icon: IconPin,
                  title: 'RE/MAX Glorion',
                  sub: 'Krymská 1056/5, 360 01 Karlovy Vary',
                  href: null,
                },
              ].map(({ Icon, title, sub, href }) => {
                const inner = (
                  <>
                    <span className="w-11 h-11 rounded-full bg-rose/10 text-rose flex items-center justify-center flex-shrink-0">
                      <Icon width={20} height={20} />
                    </span>
                    <span>
                      <span className="block font-semibold text-navy">{title}</span>
                      <span className="block text-sm text-muted">{sub}</span>
                    </span>
                  </>
                )
                return (
                  <Reveal key={title}>
                    {href ? (
                      <a
                        href={href}
                        className="flex items-center gap-4 p-4 rounded-[16px] border border-[#CED7E4] hover:border-rose/50 hover:bg-offwhite transition-colors duration-200"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 p-4 rounded-[16px] border border-[#CED7E4]">
                        {inner}
                      </div>
                    )}
                  </Reveal>
                )
              })}
            </div>
          </div>

          {/* dark form */}
          <Reveal delay={0.1}>
            {sent ? (
              <div className="h-full min-h-[440px] flex flex-col items-center justify-center text-center p-10 bg-navy rounded-[30px]">
                <span className="w-16 h-16 rounded-full bg-rose text-white flex items-center justify-center mb-5">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <h3 className="text-[1.5rem] font-extrabold text-white mb-2">Zpráva odeslána</h3>
                <p className="text-white/60 max-w-xs">
                  Děkuji za zprávu. Ozvu se Vám co nejdříve, nejpozději do 24 hodin.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-near-black rounded-[30px] p-7 md:p-9 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <DarkField
                    label="Jméno *"
                    required
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    placeholder="Jana Nováková"
                  />
                  <DarkField
                    label="Telefon *"
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(v) => setForm({ ...form, phone: v })}
                    placeholder="+420 777 000 000"
                  />
                </div>
                <DarkField
                  label="E-mail"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  placeholder="jana@email.cz"
                />
                <div>
                  <label className="block text-sm font-medium text-offwhite mb-2">
                    Co byste chtěla řešit?
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Chci prodat byt, dům nebo pozemek v Karlových Varech a okolí..."
                    className="w-full bg-near-black border border-white/15 rounded-[12px] px-4 py-3.5 text-[0.95rem] text-offwhite placeholder:text-muted/70 placeholder:italic focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose/25 transition resize-none"
                  />
                </div>
                <MagneticButton
                  as="button"
                  type="submit"
                  distance={0.2}
                  className="group w-full bg-rose text-white font-medium py-4 rounded-full hover:bg-rose-hover transition-colors duration-200 inline-flex items-center justify-center gap-2"
                >
                  Odeslat zprávu
                  <IconArrow width={17} height={17} className="transition-transform group-hover:translate-x-1" />
                </MagneticButton>
                <p className="text-xs text-muted/70 text-center">
                  Konzultace zdarma a bez závazků. Odpovím do 24 hodin.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-navy text-white/60 py-14">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-[1.2rem] font-bold text-white">Jana Klimešová</p>
            <p className="text-sm mt-1.5">
              RE/MAX Glorion · Krymská 1056/5, 360 01 Karlovy Vary
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href={PHONE_HREF} className="hover:text-white transition-colors">
              608 526 462
            </a>
            <a href={`mailto:${EMAIL}`} className="hover:text-white transition-colors">
              E-mail
            </a>
            <a href="#top" className="hover:text-white transition-colors">
              Nahoru
            </a>
          </div>
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 mt-10 pt-6 border-t border-white/10 text-xs text-white/30 text-center md:text-left">
          &copy; {new Date().getFullYear()} Jana Klimešová. Nezávazný koncept webu.
        </div>
      </footer>
    </div>
  )
}

/* ---------- FORM FIELDS ---------- */
interface DarkFieldProps {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
  placeholder?: string
}

function DarkField({ label, value, onChange, type = 'text', required, placeholder }: DarkFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-offwhite mb-2">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-near-black border border-white/15 rounded-[12px] px-4 py-3.5 text-[0.95rem] text-offwhite placeholder:text-muted/70 placeholder:italic focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose/25 transition"
      />
    </div>
  )
}
