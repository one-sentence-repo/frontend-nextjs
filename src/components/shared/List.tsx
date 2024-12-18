import cn from '@/src/lib/cn'
import { ComponentProps, PropsWithChildren, RefObject } from 'react'

interface Props extends ComponentProps<'ul'> {
  className?: string
  targetRef?: RefObject<HTMLUListElement>
  isRounded?: boolean
  isBackground?: boolean
  onTransitionEnd?: () => void
  dataStatus?: string
}

export function List({
  children,
  className,
  targetRef,
  dataStatus,
  isRounded,
  isBackground,
  onTransitionEnd,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <ul
      ref={targetRef}
      data-status={dataStatus}
      onTransitionEnd={onTransitionEnd}
      className={cn(
        'list-none',
        isRounded && 'rounded-md',
        isBackground && 'bg-white dark:bg-var-dark',
        className,
      )}
      {...props}
    >
      {children}
    </ul>
  )
}

interface RowProps extends ComponentProps<'li'> {
  className?: string
  targetRef?: RefObject<HTMLLIElement>
}

List.Row = ({
  children,
  className,
  targetRef,
  ...props
}: PropsWithChildren<RowProps>) => {
  return (
    <li ref={targetRef} className={cn(className)} {...props}>
      {children}
    </li>
  )
}
