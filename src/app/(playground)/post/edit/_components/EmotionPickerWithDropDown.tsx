'use client'

import cn from '@/src/lib/cn'
import { List } from '@/src/components/shared/List'
import { RefObject } from 'react'
import { useTheme } from '@/src/store/useTheme'
import Icon from '@/src/components/shared/Icon'
import { DropDown } from '@/src/components/shared/DropDown'
import { TEmotion } from '../page'
import { EMOTION_STATUS } from '../_constants'
import { YStack } from '@/src/components/shared/Stack'

interface Props {
  selectedEmotion: TEmotion | null
  targetRef: RefObject<HTMLDivElement>
  onChangeEmotion: (emotion: TEmotion | null) => void
  onTransitionEnd: () => void
  isSide?: boolean
}

export default function EmotionPickerWithDropDown({
  selectedEmotion,
  onChangeEmotion,
  targetRef,
  onTransitionEnd,
  isSide,
}: Props) {
  return (
    <DropDown.Content
      ref={targetRef}
      position={isSide ? 'bottomRight' : 'topRight'}
      initStatus="closed"
      onTransitionEnd={onTransitionEnd}
    >
      <YStack className="items-start justify-between gap-2">
        {EMOTION_STATUS.map((emotion, index) => (
          <EmotionBlock
            key={emotion.status}
            emotion={emotion}
            index={index}
            selectedEmotion={selectedEmotion}
            onChangeEmotion={onChangeEmotion}
          />
        ))}
      </YStack>
    </DropDown.Content>
  )
}

interface EmotionBlockProps {
  emotion: (typeof EMOTION_STATUS)[number]
  onChangeEmotion: (emotion: TEmotion) => void
  selectedEmotion: TEmotion | null
  index: number
}

function EmotionBlock({
  emotion,
  selectedEmotion,
  onChangeEmotion,
  index,
}: EmotionBlockProps) {
  const { color } = useTheme()
  let blockOpacity: string
  switch (index) {
    case 0:
      blockOpacity = 'opacity-20'
      break
    case 1:
      blockOpacity = 'opacity-40'
      break
    case 2:
      blockOpacity = 'opacity-60'
      break
    case 3:
      blockOpacity = 'opacity-80'
      break
    case 4:
      blockOpacity = 'opacity-100'
      break
    default:
      break
  }
  return (
    <List.Row
      onClick={() => onChangeEmotion(emotion.percent)}
      className="relative flex cursor-pointer justify-center"
    >
      <div
        onClick={() => onChangeEmotion(emotion.percent)}
        className="relative flex flex-col gap-2 font-medium text-zinc-400 hover:opacity-100"
      >
        <div
          className={cn(
            'flex size-6 items-center justify-center rounded-full bg-zinc-300 text-white transition dark:bg-var-darkgray',
            blockOpacity!,
            color === 'yellow' && 'bg-var-yellow dark:bg-var-yellow',
            color === 'orange' && 'bg-var-orange dark:bg-var-orange',
            color === 'black' && 'bg-black/60 dark:bg-white/60',
            color === 'blue' && 'bg-var-blue dark:bg-var-blue',
            color === 'green' && 'bg-var-green dark:bg-var-green',
          )}
        />
        {selectedEmotion === emotion.percent && (
          <Icon
            view="0 -960 960 960"
            size={18}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
          >
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
          </Icon>
        )}
      </div>
    </List.Row>
  )
}
