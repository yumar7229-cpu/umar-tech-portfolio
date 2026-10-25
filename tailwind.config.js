/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#050B12',
        deep: '#081522',
        panel: '#0A1A2A',
        accent: {
          DEFAULT: '#27BFFF',
          dim: '#1E97CC',
        },
        silver: '#F2F5F8',
        mist: '#93A1AF',
        line: 'rgba(242, 245, 248, 0.08)',
      },
      fontFamily: {
        display: ['"Space Grotesk Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Inter Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 7.2vw, 5.75rem)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2rem, 4.6vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.5rem, 2.6vw, 2.125rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
      },
      boxShadow: {
        card: '0 30px 70px -35px rgba(0, 0, 0, 0.85)',
        lift: '0 40px 90px -40px rgba(0, 0, 0, 0.9)',
        glow: '0 0 44px -14px rgba(39, 191, 255, 0.5)',
      },
      backgroundImage: {
        'fade-down': 'linear-gradient(to bottom, rgba(5,11,18,0) 0%, rgba(5,11,18,0.65) 55%, #050B12 96%)',
        'fade-left': 'linear-gradient(to left, rgba(5,11,18,0) 0%, rgba(5,11,18,0.55) 45%, #050B12 100%)',
        'card-sheen': 'linear-gradient(150deg, rgba(39,191,255,0.07) 0%, rgba(8,21,34,0.6) 40%, rgba(5,11,18,0.9) 100%)',
      },
      letterSpacing: {
        mega: '0.32em',
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
