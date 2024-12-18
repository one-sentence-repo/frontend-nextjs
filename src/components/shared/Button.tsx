'use client'

import cn from '@/src/lib/cn'
import { cva } from 'class-variance-authority'
import { ComponentProps, forwardRef, PropsWithRef } from 'react'
import Spinner from './Spinner'
import { colorTheme, useTheme } from '@/src/store/useTheme'

export interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean
  dataStatus?: string
  variant?: 'primary' | 'secondary' | 'teritory' | 'list' | 'icon' | 'none'
  size?: 'sm' | 'md' | 'lg' | 'icon' | 'none'
}

const BUTTON_VARIANTS = cva(
  'flex items-center justify-center text-nowrap font-semibold text-white transition active:scale-95',
  {
    variants: {
      active: {
        primary: 'rounded-md hover:opacity-65',
        secondary:
          'rounded-md bg-white text-var-black ring-1 ring-zinc-400 hover:opacity-65 dark:bg-var-darkgray dark:text-zinc-200 dark:ring-zinc-500',
        teritory: 'text-zinc-500 hover:opacity-65 dark:text-zinc-200',
        list: 'justify-start rounded-md font-normal text-zinc-600 hover:bg-var-lightgray dark:text-zinc-300 dark:hover:bg-var-dark dark:hover:text-zinc-200',
        none: '',
        icon: 'rounded-md text-zinc-400 transition hover:bg-var-lightgray dark:text-zinc-400 dark:hover:bg-var-dark dark:hover:text-zinc-300',
      },
      disabled: {
        primary:
          'gap-2 rounded-md bg-zinc-300 text-zinc-200 active:scale-100 dark:bg-zinc-500 dark:text-zinc-400',
        secondary:
          'gap-2 rounded-md bg-zinc-300 text-zinc-200 ring-1 ring-zinc-300 active:scale-100 dark:bg-zinc-500 dark:text-zinc-400 dark:ring-zinc-500',
        teritory: '',
        list: '',
        icon: 'rounded-md text-zinc-400 transition dark:text-zinc-400',
        none: '',
      },
      size: {
        sm: 'px-3 py-2 text-xs',
        md: 'px-3 py-3 text-sm',
        lg: 'px-4 py-4 text-lg',
        icon: 'p-2',
        none: '',
      },
    },
  },
)

const Button = forwardRef<HTMLButtonElement, PropsWithRef<ButtonProps>>(
  (
    {
      children,
      className,
      isLoading = false,
      onClick,
      dataStatus,
      disabled = false,
      type = 'button',
      size = 'md',
      variant = 'primary',
      ...props
    },
    ref,
  ) => {
    const { color } = useTheme()

    const buttonClasses = cn(
      variant === 'primary' && colorTheme({ color }),
      BUTTON_VARIANTS({
        [isLoading || disabled ? 'disabled' : 'active']: variant,
        size,
      }),
      className,
    )

    return (
      <button
        ref={ref}
        disabled={disabled}
        data-status={dataStatus}
        onClick={onClick}
        type={type}
        className={buttonClasses}
        {...props}
      >
        {children}
        {isLoading && (
          <Spinner size={size === 'sm' ? 16 : 20} variants="circle" />
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'

export default Button
