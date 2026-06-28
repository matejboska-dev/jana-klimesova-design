/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // primary brand
        navy: '#0D0D0D',
        'navy-mid': '#1A1A1A',
        // text
        charcoal: '#222222',
        'near-black': '#0A0A0A',
        // primary CTA accent
        rose: '#D98A9B',
        'rose-hover': '#B35D71',
        'rose-soft': '#C77586',
        // neutrals
        muted: '#999999',
        border: '#CED7E4',
        'light-fill': '#EEEEEE',
        offwhite: '#FAFAFA',
      },
      fontFamily: {
        sans: ['Outfit', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        'display': ['clamp(3.2rem, 7vw, 6.2rem)', { lineHeight: '1.0', letterSpacing: '-0.02em', fontWeight: '800' }],
        'h2': ['clamp(2rem, 4.5vw, 3.15rem)', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '800' }],
        'h3': ['clamp(1.4rem, 2.5vw, 2.2rem)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '800' }],
      },
      borderRadius: {
        card: '30px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'clip-reveal': {
          '0%': { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' },
          '100%': { clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)' },
        },
      },
      animation: {
        marquee: 'marquee 36s linear infinite',
        'clip-reveal': 'clip-reveal 1.2s cubic-bezier(0.77, 0, 0.18, 1) forwards',
      },
      boxShadow: {
        card: '0px 4px 12px rgba(0, 0, 0, 0.08)',
        'card-hover': '0px 12px 32px rgba(0, 0, 0, 0.12)',
        'card-sm': '0px 2px 8px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}
