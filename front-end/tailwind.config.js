/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [],

  theme: {
  extend: {
    keyframes: {
      fadeIn: {
        '0%': { opacity: 0, transform: 'translateY(20px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
      },
    },
    animation: {
      fadeIn: 'fadeIn 0.8s ease-out',
    },
  },
},
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eef6ff',
        100: '#d9ecff',
        200: '#b3d9ff',
        300: '#80bfff',
        400: '#4da6ff',
        500: '#1a8cff',
        600: '#0066cc',
        700: '#004d99',
        800: '#003366',
        900: '#001a33',
      },
    },
    boxShadow: {
      soft: '0 4px 12px rgba(0, 0, 0, 0.08)',
    },
  },
},
theme: {
  extend: {
    transitionTimingFunction: {
      'soft': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    transitionDuration: {
      '400': '400ms',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      float: {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-4px)' },
      },
    },
    animation: {
      fadeIn: 'fadeIn 0.6s ease-out',
      float: 'float 3s ease-in-out infinite',
    },
  },
}
}


