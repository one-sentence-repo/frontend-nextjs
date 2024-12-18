import { TEmotion } from '@/src/app/(playground)/post/edit/page'
import cn from '@/src/lib/cn'
import { useTheme } from '@/src/store/useTheme'
import { TColor } from '@/src/types/theme'

interface Props {
  emotionLevel: TEmotion | null
  className?: string
  size?: number
  onClick?: (emotion: TEmotion | null) => void
}

export default function EmotionGauge({
  emotionLevel,
  className,
  onClick,
}: Props) {
  const { color } = useTheme()

  let emotionBlock = [0, 0, 0, 0, 0]

  switch (emotionLevel) {
    case '0%':
      emotionBlock = [1, 0, 0, 0, 0]
      break
    case '25%':
      emotionBlock = [1, 1, 0, 0, 0]
      break
    case '50%':
      emotionBlock = [1, 1, 1, 0, 0]
      break
    case '75%':
      emotionBlock = [1, 1, 1, 1, 0]
      break
    case '100%':
      emotionBlock = [1, 1, 1, 1, 1]
      break
    default:
      break
  }

  return (
    emotionLevel && (
      <div className={cn('flex items-end', className)}>
        {emotionBlock!.map((shouldRender, index) => (
          <EmotionBlock
            key={index}
            index={index}
            onClick={onClick}
            shouldRender={shouldRender}
            color={color}
          />
        ))}
      </div>
    )
  )
}

interface EmotionBlockProps {
  shouldRender: number
  color: TColor
  index: number
  onClick?: (emotion: TEmotion | null) => void
}

function EmotionBlock({
  shouldRender,
  color,
  index,
  onClick,
}: EmotionBlockProps) {
  let currentEmotion: TEmotion
  let blockOpacity: string
  let sizeString: string
  switch (index) {
    case 0:
      currentEmotion = '0%'
      break
    case 1:
      currentEmotion = '25%'
      break
    case 2:
      currentEmotion = '50%'
      break
    case 3:
      currentEmotion = '75%'
      break
    case 4:
      currentEmotion = '100%'
      break
    default:
      break
  }
  switch (index) {
    case 0:
      blockOpacity = `opacity-20`
      break
    case 1:
      blockOpacity = `opacity-40`
      sizeString = shouldRender ? 'h-[12px]' : ''
      currentEmotion = '25%'
      break
    case 2:
      blockOpacity = 'opacity-60'
      sizeString = shouldRender ? 'h-[16px]' : ''
      currentEmotion = '50%'
      break
    case 3:
      blockOpacity = 'opacity-80'
      sizeString = shouldRender ? 'h-[20px]' : ''
      break
    case 4:
      blockOpacity = 'opacity-100'
      sizeString = shouldRender ? 'h-[24px]' : ''
      currentEmotion = '100%'
      break
    default:
      break
  }
  return (
    <div
      onClick={() => onClick && onClick(currentEmotion)}
      className="flex h-full cursor-pointer items-end overflow-hidden"
    >
      <div
        className={cn(
          'size-full h-2 rounded-full bg-zinc-300/35 p-1 shadow-sm transition-all dark:bg-zinc-300/15',
          sizeString!,
          blockOpacity!,
          shouldRender &&
            color === 'yellow' &&
            'bg-var-yellow dark:bg-var-yellow',
          shouldRender &&
            color === 'orange' &&
            'bg-var-orange dark:bg-var-orange',
          shouldRender && color === 'black' && 'bg-black/60 dark:bg-white/60',
          shouldRender && color === 'blue' && 'bg-var-blue dark:bg-var-blue',
          shouldRender && color === 'green' && 'bg-var-green dark:bg-var-green',
        )}
      />
      <div className="w-px" />
    </div>
  )
}
