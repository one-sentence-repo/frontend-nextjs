import cn from '@/src/lib/cn'
import { cva } from 'class-variance-authority'
import { ElementType, PropsWithChildren } from 'react'

interface Props {
  as?: ElementType
  className?: string
  type?: 'title' | 'sub' | 'customColor' | 'caption'
  size?: 'sm' | 'md' | 'lg' | 'bigger' | 'xs'
}

const TITLE_VARIANTS = cva('', {
  variants: {
    type: {
      title: 'font-semibold text-zinc-600 dark:text-zinc-200',
      sub: 'font-medium text-zinc-600 dark:text-zinc-200',
      caption: 'text-zinc-400 dark:text-zinc-500',
      customColor: 'font-semibold',
    },
    size: {
      xs: 'text-sm',
      sm: 'text-lg',
      md: 'text-2xl',
      lg: 'text-4xl',
      bigger: 'text-4xl md:text-6xl',
    },
  },
})

export default function Title({
  children,
  className,
  type = 'title',
  size = 'md',
  as: Component = 'h1',
  ...props
}: PropsWithChildren<Props>) {
  return (
    <Component
      className={cn(TITLE_VARIANTS({ type, size }), className)}
      {...props}
    >
      {children}
    </Component>
  )
}
