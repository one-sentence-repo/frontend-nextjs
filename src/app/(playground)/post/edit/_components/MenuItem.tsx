import Button from '@/src/components/shared/Button'
import Icon from '@/src/components/shared/Icon'
import cn from '@/src/lib/cn'
import { ReactNode } from 'react'

export default function MenuItem({
  icon,
  title,
  action,
  isActive = null,
}: {
  icon?: ReactNode
  title?: string
  action?: () => void
  isActive?: (() => boolean) | null
}) {
  return (
    <Button
      onClick={action}
      title={title}
      variant="icon"
      className={cn(
        'size-6 p-0',
        isActive && isActive() ? 'bg-zinc-300 dark:bg-zinc-600' : '',
      )}
    >
      <Icon view="0 -960 960 960" size={20}>
        {icon}
      </Icon>
    </Button>
  )
}
