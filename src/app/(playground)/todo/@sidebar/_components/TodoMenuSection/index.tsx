import Button from '@/src/components/shared/Button'
import Icon from '@/src/components/shared/Icon'
import { List } from '@/src/components/shared/List'
import cn from '@/src/lib/cn'
import { TODO_MENU } from '../../../_constants'
import { useTransition } from 'react'
import Spinner from '@/src/components/shared/Spinner'
import { usePathname } from 'next/navigation'

interface Props {
  onMenuSelect: (selectedMenu: any) => any
  menu: (typeof TODO_MENU)[number]
}

export default function TodoMenuSection({ onMenuSelect, menu }: Props) {
  const pathname = usePathname()
  const splitedPath = pathname.split('/')
  const isSelected = splitedPath.includes(menu.name)
  const [isLoading, startTransition] = useTransition()
  return (
    <List.Row key={menu.id} className="size-full">
      <Button
        variant="list"
        onClick={() => startTransition(() => onMenuSelect(menu.name))}
        className="relative h-10 w-full gap-4 p-4"
      >
        <div
          className={cn(
            'relative flex size-2 items-center justify-center rounded-full text-zinc-400 transition',
            isSelected &&
              'bg-zinc-200 ring-8 ring-zinc-200 dark:bg-zinc-700 dark:ring-zinc-700',
          )}
        >
          <div className="absolute">
            {isLoading ? (
              <Spinner size={20} />
            ) : (
              <Icon view="0 -960 960 960" size={20}>
                {menu.icon}
              </Icon>
            )}
          </div>
        </div>
      </Button>
    </List.Row>
  )
}
