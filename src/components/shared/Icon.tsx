import cn from '@/src/lib/cn'
import { PropsWithChildren } from 'react'

export interface IconProps {
  name?: string
  className?: string
  size?: number
  sizeX?: number
  sizeY?: number
  view?: number | string
  viewX?: number
  viewY?: number
}

export default function Icon({
  children,
  name,
  className,
  size = 24,
  sizeX,
  sizeY,
  view = 24,
  viewX,
  viewY,
}: PropsWithChildren<IconProps>) {
  let viewProp
  if (typeof view === 'string') {
    viewProp = view
  }
  return (
    <svg
      width={sizeX || size}
      height={sizeY || size}
      viewBox={cn(
        viewProp ? viewProp : `0 0 ${viewX || view} ${viewY || view}`,
      )}
      className={cn(className)}
      aria-valuetext={name}
      stroke="currentColor"
      fill="currentColor"
    >
      {children}
    </svg>
  )
}
