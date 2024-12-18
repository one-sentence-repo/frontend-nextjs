import { ButtonProps } from '@/src/components/shared/Button'
import { TColor } from '@/src/types/theme'

export const formatColor = (color: TColor) => {
  switch (color) {
    case 'green':
      return 'text-var-green '
    case 'blue':
      return 'text-var-blue '
    case 'yellow':
      return 'text-var-yellow '
    case 'orange':
      return 'text-var-orange '
    case 'black':
      return 'text-var-black dark:text-white'
    default:
      'text-var-black dark:text-white'
      break
  }
}

export const formatButtonColor = (
  color: TColor,
  variant: ButtonProps['variant'],
) => {
  if (color === 'blue' && variant === 'primary') {
    return 'bg-var-blue ring-var-blue'
  }
  if (color === 'yellow' && variant === 'primary') {
    return 'bg-var-yellow ring-var-yellow'
  }
  if (color === 'green' && variant === 'primary') {
    return 'bg-var-green ring-var-green'
  }
  if (color === 'orange' && variant === 'primary') {
    return 'bg-var-orange ring-var-orange'
  }
  if (color === 'black' && variant === 'primary') {
    return 'bg-var-black ring-var-black dark:bg-white dark:text-var-dark dark:ring-white'
  }
}

export const formatBlockColor = (color: TColor) => {
  switch (color) {
    case 'blue':
      return 'bg-var-blue dark:bg-var-blue'
    case 'yellow':
      return 'bg-var-yellow  dark:bg-var-yellow'
    case 'green':
      return 'bg-var-green dark:bg-var-green'
    case 'orange':
      return 'bg-var-orange  dark:bg-var-orange'
    case 'black':
      return 'bg-var-black dark:text-var-dark dark:bg-white '
    default:
      break
  }
}

export const colorizeOpacity = (orderBy: number) => {
  if (orderBy) {
    if (orderBy <= 20) {
      return 'opacity-20'
    } else if (orderBy <= 40) {
      return 'opacity-40'
    } else if (orderBy <= 60) {
      return 'opacity-60'
    } else if (orderBy <= 80) {
      return 'opacity-80'
    } else {
      return 'opacity-100'
    }
  }
}
