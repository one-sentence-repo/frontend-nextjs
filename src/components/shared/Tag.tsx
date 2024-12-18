import { cva } from 'class-variance-authority'
import Button from './Button'
import cn from '@/src/lib/cn'
import { XStack } from './Stack'
import Icon from './Icon'

interface Props {
  border?: 'border' | 'none'
  background?: 'background' | 'none'
  tag: any
  index?: number
  onDelete?: (index: number) => void
}

const TAG_VARIANTS = cva(
  'animate-grow-up rounded-xl border-0 px-2 py-[2px] text-xs font-medium text-zinc-600 shadow-sm ring-0 dark:text-zinc-200',
  {
    variants: {
      border: {
        border: 'ring-1 ring-zinc-300 dark:ring-zinc-600',
        none: '',
      },
      background: {
        background: 'bg-white dark:bg-var-dark',
        none: '',
      },
    },
  },
)

export default function Tag({
  border = 'border',
  background = 'none',
  tag,
  index,
  onDelete,
}: Props) {
  return (
    <XStack>
      <Button
        variant="secondary"
        onClick={() => onDelete && onDelete(index!)}
        className={cn(
          TAG_VARIANTS({ border, background }),
          index && index >= 10 && 'ring-1 ring-red-600 dark:ring-red-600',
        )}
      >
        #{tag}{' '}
        {onDelete && (
          <Icon view="0 -960 960 960" size={12}>
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </Icon>
        )}
      </Button>
    </XStack>
  )
}
