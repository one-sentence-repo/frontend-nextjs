import Button from '@/src/components/shared/Button'
import Icon from '@/src/components/shared/Icon'
import ToolTip from '@/src/components/shared/Tooltip'
import useToggle from '@/src/hooks/useToggle'
import cn from '@/src/lib/cn'

interface Props {
  commentCount?: number | null
  showComment?: boolean
  onShowComment?: () => void
  disabled?: boolean
  viewToolTip?: boolean
  isSide?: boolean
}

export default function CommentButton({
  showComment,
  onShowComment,
  commentCount,
  disabled,
  viewToolTip,
  isSide,
}: Props) {
  const { isOpen: isHover, open: hover, close: leave } = useToggle()

  return (
    <div onMouseEnter={hover} onMouseLeave={leave} className="relative">
      <Button
        variant="icon"
        size={isSide ? 'md' : 'icon'}
        disabled={disabled}
        onClick={onShowComment}
        className={cn(
          'flex border-none text-xs font-light transition hover:text-blue-400 dark:hover:text-blue-400',
          isSide ? 'max-lg:flex-col' : 'gap-1',
          showComment && 'text-blue-400 dark:text-blue-400',
        )}
      >
        <Icon size={isSide ? 24 : 18} view={150}>
          <g id="income">
            <path d="M33,105h21v15l18-15h45c4.97,0,9-4.03,9-9v-57c0-4.97-4.03-9-9-9H33c-4.97,0-9,4.03-9,9v57c0,4.97,4.03,9,9,9Z" />
            <line x1="51" y1="57" x2="99" y2="57" />
            <line x1="51" y1="78" x2="99" y2="78" />
          </g>
        </Icon>
        {commentCount ?? 0}
      </Button>
      {viewToolTip && <ToolTip isHover={isHover} text="댓글" />}
    </div>
  )
}
