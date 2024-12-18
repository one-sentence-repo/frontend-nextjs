import useDataDrivenAnimation from '@/src/hooks/useStateChange'
import cn from '@/src/lib/cn'
import { colorTheme, useTheme } from '@/src/store/useTheme'
import { IUserInfoWithMBTI } from '@/src/types/auth'

interface Props {
  pathname?: string
  userId?: string
  me?: IUserInfoWithMBTI | null
  isSelected?: boolean
}

export default function BookMark({ pathname, userId, me, isSelected }: Props) {
  const { color } = useTheme()
  const { open, close, ref, onTransitionEnd } =
    useDataDrivenAnimation<HTMLDivElement>()
  if ((pathname === 'profile' && userId === me?.id) || isSelected) {
    open()
  } else {
    close()
  }
  return (
    <div
      ref={ref}
      data-status="closed"
      onTransitionEnd={onTransitionEnd}
      className={cn(
        colorTheme({ color }),
        'absolute -left-2 top-1/2 h-full w-1 -translate-y-1/2 rounded-r-md transition duration-500 data-[status=closed]:scale-0',
      )}
    />
  )
}
