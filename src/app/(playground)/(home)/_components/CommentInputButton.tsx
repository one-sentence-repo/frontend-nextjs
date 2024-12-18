import Button from '@/src/components/shared/Button'
import Icon from '@/src/components/shared/Icon'

interface Props {
  onShowCommentInput: () => void
}

export default function CommentInputButton({ onShowCommentInput }: Props) {
  return (
    <Button
      variant="icon"
      size="icon"
      onClick={onShowCommentInput}
      className="flex gap-2 border-none text-xs font-light"
    >
      <Icon size={16} view={150}>
        <g id="forward">
          <path d="M16.09,142.64c-2.36-10.16-3.01-21.3-.9-32.59,2.08-11.27,6.82-22.55,13.82-32.64,6.99-10.11,16.1-19.07,26.87-26.32,5.39-3.63,11.23-6.81,17.55-9.46,6.33-2.64,13.15-4.75,20.67-5.99v58c-2.67-1.19-6.02-2.04-9.63-2.48-3.62-.43-7.52-.48-11.48-.08-7.94.78-16.17,3.15-23.83,7.19-7.67,4.04-14.8,9.82-20.58,17.36-5.78,7.52-10.01,16.82-12.48,27.01Z" />
          <polygon points="70.09 125.86 70.09 7.36 136.09 66.61 70.09 125.86" />
        </g>
      </Icon>
    </Button>
  )
}
