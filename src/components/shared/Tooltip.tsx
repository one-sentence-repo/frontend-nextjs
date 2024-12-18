import cn from '@/src/lib/cn'
import { cva } from 'class-variance-authority'
import useDataDrivenAnimation from '@/src/hooks/useStateChange'
import { colorTheme, useTheme } from '@/src/store/useTheme'
import { useEffect } from 'react'

interface Props {
  text: string
  position?: 'top' | 'topLeft' | 'bottomLeft' | 'bottomRight' | 'left' | 'right'
  size?: 'sm' | 'md' | 'lg' | 'none'
  isHover?: boolean
  className?: string
}

const toolTipBox = cva(
  'pointer-events-none absolute z-20 hidden transition duration-300 data-[status=closed]:opacity-0',
  {
    variants: {
      position: {
        top: '-top-full',
        topLeft:
          '-top-[calc(100%-8px)] left-2 data-[status=closed]:translate-y-1',
        bottomLeft:
          '-bottom-[calc(100%-4px)] left-2 data-[status=closed]:translate-y-1',
        bottomRight:
          '-bottom-[calc(100%-4px)] right-2 data-[status=closed]:translate-y-1',
        left: '-left-full',
        right:
          '-right-[calc(100%*2-4px)] top-1/2 -translate-y-1/2 data-[status=closed]:-translate-x-1',
      },
      size: {
        sm: 'w-20',
        md: 'w-40',
        lg: 'w-60',
        none: '',
      },
    },
  },
)

const toolTipArrow = cva('absolute size-2 rotate-45', {
  variants: {
    position: {
      bottomLeft: '-top-1 left-2',
      bottomRight: '-top-1 right-2',
      top: '-bottom-1 left-1/2 -translate-x-1/2',
      topLeft: '-bottom-1 left-2',
      right: '-left-1 top-2',
      left: '-right-1 top-1/2 -translate-y-1/2',
    },
  },
})

export default function ToolTip({
  text,
  position = 'bottomLeft',
  size = 'none',
  isHover,
  className,
}: Props) {
  const { ref, open, close, onTransitionEnd } =
    useDataDrivenAnimation<HTMLDivElement>()
  const { color } = useTheme()

  useEffect(() => {
    isHover ? open() : close()
  }, [isHover])

  return (
    <>
      <div
        ref={ref}
        data-status="closed"
        onTransitionEnd={onTransitionEnd}
        className={cn(toolTipBox({ position, size }), className)}
      >
        <div
          className={cn(
            'relative flex size-fit items-center justify-center rounded-md px-2 py-2 opacity-85 shadow-lg dark:shadow-zinc-800',
            colorTheme({ color }),
          )}
        >
          <div
            className={cn(toolTipArrow({ position }), colorTheme({ color }))}
          />
          <span
            className={cn(
              colorTheme({ color }),
              'text-nowrap text-xs font-semibold text-white',
            )}
          >
            {text}
          </span>
        </div>
      </div>
    </>
  )
}
