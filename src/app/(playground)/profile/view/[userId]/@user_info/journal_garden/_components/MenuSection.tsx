import Button from '@/src/components/shared/Button'
import Text from '@/src/components/shared/Text'
import cn from '@/src/lib/cn'
import { useRouter } from 'next/navigation'
import { Fragment, useTransition } from 'react'
import { PROFILE_NAVIGATE_MENUS } from '../../../_constants/Navigate'
import { routes } from '@/src/routes'

interface Props {
  menu: any
  idx: any
  userId: any
  counts: any
  segment: any
  likedCount: any
}

export default function MenuSection({
  menu,
  idx,
  userId,
  counts,
  segment,
  likedCount,
}: Props) {
  const router = useRouter()
  const [isLoading, startTransition] = useTransition()

  return (
    <Fragment key={menu.id}>
      <Button
        variant="teritory"
        size="sm"
        onClick={() =>
          startTransition(() =>
            router.push(routes.profile.view(userId, menu.path)),
          )
        }
        isLoading={isLoading}
        className={cn(
          'flex-1 rounded-md font-medium text-zinc-500',
          segment === menu.path && 'bg-zinc-100 dark:bg-var-dark',
        )}
      >
        {menu.name}
        {counts.map(
          (data: any) =>
            data.postType === menu.path && (
              <Fragment key={data.postType}>
                <Text type="caption" size="xs" className="ml-1">
                  {data.count}
                </Text>
              </Fragment>
            ),
        )}
        {menu.path === 'liked' && (
          <Text type="caption" size="xs" className="ml-1">
            {likedCount}
          </Text>
        )}
      </Button>
      {PROFILE_NAVIGATE_MENUS.length === idx + 1 ? null : (
        <div
          className={cn(
            'my-auto h-3 border-r border-zinc-200 dark:border-zinc-600',
          )}
        />
      )}
    </Fragment>
  )
}
