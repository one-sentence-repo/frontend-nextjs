import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
import { PluginCreator } from 'tailwindcss/types/config'

const pluginContainer: PluginCreator = ({ addUtilities }) => {
  addUtilities({
    'dragdown-hovered': {
      borderBottomColor: 'rgb(59 130 246)',
    },
    'dragup-hovered': {
      borderTopColor: 'rgb(59 130 246)',
    },
    '.no-scrollbar::-webkit-scrollbar': {
      display: 'none',
    },
    '.no-scrollbar': {
      scrollbarWidth: 'none', // Firefox
      msOverflowStyle: 'none', // IE and Edge
    },
    '.garden-scrollbar-light': {
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: '8px',
        background: '#d3d3d3',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: '#b5b5b5',
      },
    },
    '.gardent-scrollbar-dark': {
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: '8px',
        background: '#222224',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: '#3b3b3e',
      },
    },
  })
}

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'selector',
  safelist: ['ProseMirror'],
  theme: {
    extend: {
      colors: {
        'var-green': '#3FB580',
        'var-yellow': '#FED23F',
        'var-blue': '#2A9DEB',
        'var-black': '#131313',
        'var-orange': '#F5964B',
        'var-dark': '#191919',
        'var-gray': '#9CA3AF',
        'var-lightgray': '#F5F5F7',
        'var-darkgray': '#222224',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-reverse': {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          from: { opacity: '0', transform: 'translateY(-10%)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        click: {
          from: { transform: 'scale(0.95)' },
          to: { transform: 'scale(1)' },
        },
        'grow-up': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'cta-fadein-out': {
          '0%': {
            boxShadow:
              'var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
          },
          '50%': {
            boxShadow:
              'var(--tw-ring-inset) 0 0 0 calc(5px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
          },
          '100%': {
            boxShadow:
              'var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
          },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-in-out',
        'fade-in-reverse': 'fade-in-reverse 0.3s ease-in-out',
        'slide-down': 'slide-down 0.3s ease-in-out',
        click: 'click 0.1s ease-in-out forwards',
        'cta-fadein-out': 'cta-fadein-out 3s ease-in-out infinite',
        'grow-up': 'grow-up 0.3s ease-in-out forwards',
      },
    },
  },
  plugins: [typography, pluginContainer],
}
export default config
