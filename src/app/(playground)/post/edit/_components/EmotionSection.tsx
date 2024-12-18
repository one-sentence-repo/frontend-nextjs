import { DropDown } from '@/src/components/shared/DropDown'
import useToggle from '@/src/hooks/useToggle'
import EmotionPickerWithDropDown from './EmotionPickerWithDropDown'
import Text from '@/src/components/shared/Text'
import useDataDrivenAnimation from '@/src/hooks/useStateChange'
import useOutsideClick from '@/src/hooks/useOutsideClick'
import Icon from '@/src/components/shared/Icon'
import ToolTip from '@/src/components/shared/Tooltip'
import { ZStack } from '@/src/components/shared/Stack'
import { TEmotion } from '../page'

interface Props {
  onChangeEmotion: (emotion: TEmotion | null) => void
  selectedEmotion: TEmotion | null
  isSide?: boolean
}

export default function EmotionSection({
  selectedEmotion,
  onChangeEmotion,
  isSide,
}: Props) {
  const {
    close: emotionClose,
    onClick: emotionClick,
    onTransitionEnd: emotionTransitionEnd,
    ref: emotionRef,
  } = useDataDrivenAnimation<HTMLDivElement>()
  const emotionButtonRef = useOutsideClick<HTMLButtonElement>(emotionClose)
  const { isOpen: isHover, open, close } = useToggle()

  if (!selectedEmotion) return null

  return (
    <div
      onMouseEnter={open}
      onMouseLeave={close}
      className="relative flex size-full items-center justify-start"
    >
      <DropDown.Root className="flex place-items-center gap-2 sm:flex-col">
        <ZStack direction="col" gap={0} className="items-center">
          <DropDown.Trigger
            targetRef={emotionButtonRef}
            variant="icon"
            onClick={emotionClick}
            className="flex-col"
          >
            {selectedEmotion && (
              <Text type="caption" size="xs" className="absolute top-0">
                {(selectedEmotion === '0%' && '매우나쁨') ||
                  (selectedEmotion === '25%' && '나쁨') ||
                  (selectedEmotion === '50%' && '보통') ||
                  (selectedEmotion === '75%' && '좋음') ||
                  (selectedEmotion === '100%' && '매우좋음')}
              </Text>
            )}
            <Icon view="0 -960 960 960" size={isSide ? 24 : 18}>
              {selectedEmotion ? (
                <path d="M480-800q134 0 227 93t93 227q0 134-93 227t-227 93q-134 0-227-93t-93-227q0-134 93-227t227-93Zm0 560q100 0 170-70t70-170q0-100-70-170t-170-70q-100 0-170 70t-70 170q0 100 70 170t170 70Zm0-100q48 0 86-27.5t54-72.5H340q16 45 54 72.5t86 27.5ZM340-560q0 17 11.5 28.5T380-520q17 0 28.5-11.5T420-560q0-17-11.5-28.5T380-600q-17 0-28.5 11.5T340-560Zm200 0q0 17 11.5 28.5T580-520q17 0 28.5-11.5T620-560q0-17-11.5-28.5T580-600q-17 0-28.5 11.5T540-560ZM40-720v-120q0-33 23.5-56.5T120-920h120v80H120v120H40ZM240-40H120q-33 0-56.5-23.5T40-120v-120h80v120h120v80Zm480 0v-80h120v-120h80v120q0 33-23.5 56.5T840-40H720Zm120-680v-120H720v-80h120q33 0 56.5 23.5T920-840v120h-80ZM480-480Z" />
              ) : (
                <path d="M620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm140 260q68 0 123.5-38.5T684-400H276q25 63 80.5 101.5T480-260Zm0 180q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
              )}
            </Icon>
          </DropDown.Trigger>
        </ZStack>
        <EmotionPickerWithDropDown
          targetRef={emotionRef}
          onTransitionEnd={emotionTransitionEnd}
          selectedEmotion={selectedEmotion}
          onChangeEmotion={onChangeEmotion}
          isSide={isSide}
        />
        <ToolTip
          position={isSide ? 'topLeft' : 'bottomLeft'}
          size="md"
          isHover={isHover}
          text="감정 농도 선택"
          className="left-0"
        />
      </DropDown.Root>
    </div>
  )
}
