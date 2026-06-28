import React from 'react'

const base: React.SVGProps<SVGSVGElement> = {
  width: 28,
  height: 28,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function IconHome(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M9.5 21v-6h5v6" />
    </svg>
  )
}

export function IconCamera(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L17 6h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      <circle cx="12" cy="12.5" r="3.5" />
    </svg>
  )
}

export function IconDoc(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M6 3h7l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M13 3v5h5" />
      <path d="M8.5 13h7M8.5 16.5h7M8.5 9.5h3" />
    </svg>
  )
}

export function IconKey(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="7.5" cy="15.5" r="4.5" />
      <path d="m10.5 12.5 9-9" />
      <path d="m16 4 3 3" />
      <path d="m13 7 3 3" />
    </svg>
  )
}

export function IconShield(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

export function IconCompass(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </svg>
  )
}

export function IconArrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}

export function IconArrowUpRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  )
}

export function IconPhone(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3 5a2 2 0 0 1 2-2h2.5a1 1 0 0 1 1 .8l.9 4a1 1 0 0 1-.5 1l-1.6.9a12 12 0 0 0 5.7 5.7l.9-1.6a1 1 0 0 1 1-.5l4 .9a1 1 0 0 1 .8 1V19a2 2 0 0 1-2 2A16 16 0 0 1 3 5Z" />
    </svg>
  )
}

export function IconMail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

export function IconPin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-5.5 7-11a7 7 0 0 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

export function IconStar(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16} {...props}>
      <path d="M12 2.5l2.9 6 6.6.7-4.9 4.5 1.4 6.5L12 17.8 6 20.2l1.4-6.5L2.5 9.2l6.6-.7z" />
    </svg>
  )
}

export function IconQuote(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={36} height={36} {...props}>
      <path d="M9.5 5C6.5 6.2 4.5 9 4.5 12.4V19h6.2v-6.4H7.4c0-2 1-3.6 2.9-4.4L9.5 5Zm9.5 0c-3 1.2-5 4-5 7.4V19h6.2v-6.4h-3.3c0-2 1-3.6 2.9-4.4L19 5Z" />
    </svg>
  )
}
