import cn from '@/src/lib/cn'
import { cva } from 'class-variance-authority'
import { ComponentProps, forwardRef, PropsWithRef } from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'

interface Props extends ComponentProps<'input'> {
  className?: string
  variant?: 'primary' | 'secondary' | 'auth' | 'none'
  register?: UseFormRegisterReturn
  error?: FieldError
  dimension?: 'xs' | 'sm' | 'md' | 'lg' | 'none'
  dataStatus?: string
}

const INPUT_VARIANTS = cva(
  'min-w-4 outline-none transition placeholder:text-zinc-300/75 dark:placeholder:text-zinc-700/75',
  {
    variants: {
      variant: {
        primary:
          'rounded-md bg-white shadow-sm ring-zinc-200 focus:ring-2 dark:bg-var-darkgray dark:text-white dark:ring-zinc-600',
        secondary:
          'bg-transparent text-zinc-600 dark:border-zinc-600 dark:bg-transparent dark:text-zinc-200 dark:ring-zinc-600',
        auth: 'rounded-md bg-zinc-200 dark:bg-white/15 dark:text-white',
        none: '',
      },
      dimension: {
        xs: 'p-2 text-sm',
        sm: 'px-2 py-3 text-sm',
        md: 'p-4 text-sm',
        lg: 'p-4 text-base',
        none: '',
      },
    },
  },
)

const Input = forwardRef<HTMLInputElement, PropsWithRef<Props>>(
  (
    {
      className,
      register,
      variant = 'primary',
      dimension = 'sm',
      error,
      dataStatus,
      ...props
    },
    ref,
  ) => {
    return (
      <input
        ref={ref}
        data-status={dataStatus}
        className={cn(
          INPUT_VARIANTS({ variant, dimension }),
          error ? 'ring-4 ring-red-500 dark:ring-red-500' : '',
          className,
        )}
        {...register}
        {...props}
      />
    )
  },
)

export default Input
