import cn from '@/src/lib/cn'
import { cva } from 'class-variance-authority'
import { ComponentProps, PropsWithChildren } from 'react'

type GapSizes = 'px' | 0 | 1 | 2 | 3 | 4 | 6 | 8 | 10 | 12

interface StackProps extends ComponentProps<'div'> {
  className?: string
  dataStatus?: string
  gap?: GapSizes
  as?: 'div' | 'nav' | 'header' | 'main' | 'footer' | 'article' | 'section'
  direction?: 'row' | 'col'
}

const stackClasses = cva('', {
  variants: {
    gap: {
      0: 'gap-0',
      px: 'gap-px',
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      6: 'gap-6',
      8: 'gap-8',
      10: 'gap-10',
      12: 'gap-12',
    },
    direction: {
      col: 'flex flex-col',
      row: 'flex',
    },
  },
})

const Stack = ({
  children,
  gap = 2,
  className,
  dataStatus,
  as: Component = 'div',
  direction = 'row',
}: PropsWithChildren<StackProps>) => {
  return (
    <Component
      data-status={dataStatus}
      className={cn(stackClasses({ gap, direction }), className)}
    >
      {children}
    </Component>
  )
}

export const XStack = (props: PropsWithChildren<StackProps>) => (
  <Stack {...props} direction="row" />
)
export const YStack = (props: PropsWithChildren<StackProps>) => (
  <Stack {...props} direction="col" />
)
export const ZStack = (props: PropsWithChildren<StackProps>) => (
  <Stack {...props} className="relative" />
)

XStack.displayName = 'XStack'
YStack.displayName = 'YStack'
ZStack.displayName = 'ZStack'
