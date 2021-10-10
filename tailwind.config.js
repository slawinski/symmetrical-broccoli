const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lightGrey: '#F8FBFC',
        grey: '#767A89',
        alert: '#DF4241',
      }
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({addComponents, theme, addBase, addUtilities}) {
      addBase({
        h1: {
          fontFamily: theme('fontFamily.inter'),
        },
        h2: {
          fontSize: theme('fontSize.lg'),
          fontFamily: theme('fontFamily.inter'),
          fontWeight: theme('fontWeight.semibold'),
          lineHeight: '1.375rem',
          letterSpacing: theme('letterSpacing.wide'),
        },
      })
      addComponents({
        '.button-join': {
          background: 'linear-gradient(180deg, #0F8CFF 0%, #007FF4 86.98%)',
          boxShadow: '0px 15px 30px rgba(0, 114, 219, 0.15)',
          borderRadius: '16px',
        },
        '.button-enabled': {
          boxShadow: '0px -7px 15px rgba(167, 167, 167, 0.01), 0px 15px 30px rgba(167, 167, 167, 0.08)',
          borderRadius: '16px',
        },
        '.button-leave': {
          boxShadow: '0px 15px 30px rgba(201, 35, 34, 0.15)',
          borderRadius: '16px',
        },
        '.input-field' :{
          boxShadow: '0px -7px 15px rgba(167, 167, 167, 0.01), 0px 15px 30px rgba(167, 167, 167, 0.08)',
          borderRadius: '16px',
        },
        '.label': {
          fontSize: theme('fontSize.base'),
          fontFamily: theme('fontFamily.inter'),
          fontWeight: theme('fontWeight.bold'),
          lineHeight: '1.1875rem',
          letterSpacing: theme('letterSpacing.wider'),
        },
        '.body': {},
        '.body2': {},
        '.caption': {
          fontSize: theme('fontSize.sm'),
          fontFamily: theme('fontFamily.inter'),
          fontWeight: theme('fontWeight.normal'),
          lineHeight: '1.0625rem',
        },
      })
    }),
  ],
}
