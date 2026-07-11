/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fredoka: ['"Fredoka One"', 'cursive'],
        quicksand: ['Quicksand', 'sans-serif'],
        comic: ['"Comic Neue"', 'cursive'],
      },
      colors: {
        babyblue: '#BFDFFF',
        powderblue: '#89CFF0',
        softblue: '#A8D5F7',
        paleblue: '#D6EEFF',
        creamwhite: '#FFFDF5',
        paleyellow: '#FFF9C4',
        softyellow: '#FFE082',
        lavender: '#E8D5F5',
        softpurple: '#C5A8E0',
        rosepink: '#FFB6C1',
        mintgreen: '#B8F0D4',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pop-in': 'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        popIn: {
          '0%': { transform: 'scale(0) rotate(-10deg)', opacity: '0' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.9' },
        },
      },
      boxShadow: {
        soft: '0 8px 32px rgba(137, 207, 240, 0.35)',
        card: '0 4px 20px rgba(137, 207, 240, 0.25)',
        glow: '0 0 30px rgba(137, 207, 240, 0.5)',
        yellow: '0 8px 32px rgba(255, 224, 130, 0.4)',
      },
    },
  },
  plugins: [],
}
