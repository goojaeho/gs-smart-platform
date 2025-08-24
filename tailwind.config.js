/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0397D6',
        secondary: '#63C29D',
        accent: '#f97316',
        success: '#22c55e',
        warning: '#f59e0b',
        'gs-blue': '#0397D6',
        'gs-green': '#63C29D',
      },
      fontFamily: {
        sans: ['Pretendard', 'Noto Sans KR', 'sans-serif'],
      },
    },
  },
  plugins: [],
}