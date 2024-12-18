import cn from '@/src/lib/cn'
import Icon from './Icon'
import { PropsWithChildren } from 'react'

interface Props {
  size?: number
  className?: string
  variants?: 'circle' | 'logo'
}

const Spinner = ({ size = 40, variants = 'logo' }: Props) => {
  const sizePx = `size-[${size}px]`

  if (variants === 'logo') {
    return (
      <div className={cn(sizePx, 'relative')}>
        <div className="absolute size-full animate-ping rounded-full bg-zinc-300 dark:bg-zinc-600" />
        <Icon
          size={size}
          view="0 0 386 386"
          className="relative text-zinc-300 dark:text-zinc-600"
        >
          <circle cx="185" cy="185" r="185" fill="currentColor" />
          <ellipse cx="100" cy="336" rx="83" ry="21" fill="#B9B9B9" />
          <path
            d="M100 335.994L214.5 90C243 25 318 23 352.5 33.9999C326.9 39.4867 261.333 172.307 238.432 234.111C223.547 240.452 192.468 247.026 178.789 249.52C197.627 249.946 221.296 247.084 230.776 245.599C232.388 248.864 228.839 258.619 201.749 271.515C160.16 274.651 130.159 302.745 120.5 315.866C120.5 315.866 129.5 316 135 317C140.5 318 114.034 329.047 114.034 329.047L182.5 335.994L100 335.994Z"
            fill="white"
          />
        </Icon>
      </div>
    )
  }
  return (
    <Icon
      size={size}
      view={100}
      className="relative animate-spin text-zinc-800 dark:text-zinc-200"
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke="currentColor"
        strokeWidth="10"
        r="35"
        strokeDasharray="164.93485265729915 56.972477469788485"
      ></circle>
    </Icon>
  )
}

interface ContainerProps {
  className?: string
}

const Container = ({
  children,
  className,
}: PropsWithChildren<ContainerProps>) => {
  return (
    <div
      className={cn('flex size-full items-center justify-center', className)}
    >
      {children}
    </div>
  )
}

Spinner.Container = Container

export default Spinner
