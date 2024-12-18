import Button from '@/src/components/shared/Button'
import Icon from '@/src/components/shared/Icon'
import ToolTip from '@/src/components/shared/Tooltip'
import useToggle from '@/src/hooks/useToggle'
import cn from '@/src/lib/cn'
import { MouseEvent } from 'react'

interface Props {
  likedCount?: number | null
  isLiked?: boolean | null
  onLike: (e: MouseEvent) => void
  meId?: string | null
  viewToolTip?: boolean
  isSide?: boolean
}

export default function LikeButton({
  likedCount,
  isLiked,
  onLike,
  meId,
  viewToolTip,
  isSide,
}: Props) {
  const { isOpen: isHover, open: hover, close: leave } = useToggle()

  return (
    <div
      onMouseEnter={hover}
      onMouseLeave={leave}
      className="relative size-fit"
    >
      <Button
        variant="icon"
        size={isSide ? 'md' : 'icon'}
        onClick={onLike}
        className={cn(
          'flex border-none text-xs font-light hover:text-red-500 dark:hover:text-red-500',
          isSide ? 'max-lg:flex-col' : 'gap-1',
          meId && isLiked && 'text-red-500 dark:text-red-500',
        )}
      >
        <Icon size={isSide ? 24 : 18} view={150}>
          <path
            id="like"
            d="M129,57.86c0-17.04-13.6-30.86-30.38-30.86-9.55,0-18.06,6.72-23.62,13.71-5.57-7-14.08-13.71-23.62-13.71-16.78,0-30.38,13.82-30.38,30.86,0,6.34,1.88,12.24,5.12,17.14.71,1.08,7.48,9.38,8.38,10.28,9.41,9.37,40.5,37.71,40.5,37.71,0,0,35.62-33.78,46.54-44.93,4.98-5.09,7.46-12.47,7.46-20.21Z"
          />
        </Icon>
        {likedCount ?? 0}
      </Button>
      {viewToolTip && <ToolTip isHover={isHover} text="좋아요" />}
    </div>
  )
}
