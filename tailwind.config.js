const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lightGrey: '#F8FBFC',
        grey: '#767A89',
        alert: '#DF4241',
        darkNavy: '#17234D',
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
        video: {
          maxWidth: 'none',
          height: '100%',
        }
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
        '.video': {
          left: '50%',
          minHeight: '100%',
          minWidth: '100%',
          position: 'fixed',
          transform: 'translate(-50%, -50%) rotateY(180deg)',
          top: '50%',
          maxWidth: 'none',
          zIndex: '-9999',
        },
        '.container': {
          display: 'flex',
          flexDirection: 'column',
          margin: '0 auto',
          padding: '18px 0',
          height: '100vh',
          overflow: 'hidden',
        },
        '.video-circle-cropper': {
          width: '53px',
          height: '53px',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '50%',
          border: '3px solid white'
        },
        'video-circle': {
          display: 'inline',
          margin: '0 auto',
          height: '100%',
          width: 'auto',
        },
      })
    }),
  ],
}
