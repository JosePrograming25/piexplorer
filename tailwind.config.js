/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      width: {
        custom: 'calc(100% - 0.5rem)'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')

  ]
}
