'use client'

import { TColor, TTheme } from '@/src/types/theme'
import { cva } from 'class-variance-authority'
import { create } from 'zustand'

interface ThemeState {
  color: TColor
  theme: TTheme
  setColor: (color: TColor) => void
  setTheme: (theme: TTheme) => void
}

export const colorTheme = cva('', {
  variants: {
    color: {
      green: 'bg-var-green dark:bg-var-green',
      black: 'bg-var-black text-white dark:bg-white dark:text-var-dark',
      yellow: 'bg-var-yellow dark:bg-var-yellow',
      blue: 'bg-var-blue dark:bg-var-blue',
      orange: 'bg-var-orange dark:bg-var-orange',
    },
  },
})

export const ringTheme = cva('', {
  variants: {
    width: {
      1: 'ring-1',
      2: 'ring-2',
      4: 'ring-4',
      8: 'ring-8',
    },
    color: {
      blue: 'ring-var-bold_blue dark:ring-var-bold_blue',
      orange: 'ring-var-bold_orange dark:ring-var-bold_orange',
      yellow: 'ring-var-bold_yellow dark:ring-var-bold_yellow',
      green: 'ring-var-bold_green dark:ring-var-bold_green',
      black: 'ring-var-bold_black dark:ring-var-bold_black',
    },
  },
})

export const useTheme = create<ThemeState>((set) => ({
  color: 'black',
  theme: 'light',
  setColor: (color: TColor) => set((state) => ({ ...state, color })),
  setTheme: (theme: TTheme) => set((state) => ({ ...state, theme })),
}))
