/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      keyframes: {
        show: {
          from: { opacity: '0', transform: 'scale(1)' },
          to: { opacity: '0.1', transform: 'scale(1)' }
        }
      },
      animation: {
        show: 'show both'
      }
    }
  },
  plugins: [require('@tailwindcss/forms'),
    function ({ addUtilities }) {
      const newUtilities = {
        '.view-timeline-name-reveal': {
          'view-timeline-name': '--reveal'
        },
        '.animation-timeline-reveal': {
          'animation-timeline': '--reveal'
        },
        '.animation-range-entry-cover': {
          'animation-range': 'entry 1% cover 2%'
        }
      }
      addUtilities(newUtilities)
    }
  ]
}
