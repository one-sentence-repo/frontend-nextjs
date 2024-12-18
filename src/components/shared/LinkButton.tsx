import Link from 'next/link'
import Button, { ButtonProps } from './Button'
import cn from '@/src/lib/cn'

interface Props extends ButtonProps {
  href: string
  innerClassName?: string
}

export default function LinkButton({
  children,
  className,
  innerClassName,
  href,
  ...props
}: Props) {
  return (
    <Link href={href} className={cn('h-full w-full', className)}>
      <Button className={cn('h-full w-full', innerClassName)} {...props}>
        {children}
      </Button>
    </Link>
  )
}
