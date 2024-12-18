import cn from '@/src/lib/cn'

interface Props {
  className?: string
}

export default function Line({ className }: Props) {
  return (
    <hr className={cn('border-zinc-200 dark:border-zinc-700', className)} />
  )
}
