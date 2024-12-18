import { DropDown } from '@/src/components/shared/DropDown'
import Icon from '@/src/components/shared/Icon'
import ToolTip from '@/src/components/shared/Tooltip'
import useOutsideClick from '@/src/hooks/useOutsideClick'
import useDataDrivenAnimation from '@/src/hooks/useStateChange'
import useToggle from '@/src/hooks/useToggle'

interface Props {
  onChangePostType: (postType: 'article' | 'journal') => void
  postType: 'article' | 'journal'
  isSide?: boolean
}

export default function PostTypeSection({
  onChangePostType,
  postType,
  isSide,
}: Props) {
  const { close, onClick, onTransitionEnd, ref } =
    useDataDrivenAnimation<HTMLDivElement>()
  const accessTypeRef = useOutsideClick<HTMLButtonElement>(close)
  const { isOpen: isHover, open: hover, close: leave } = useToggle()

  return (
    <DropDown.Root
      onMouseEnter={hover}
      onMouseLeave={leave}
      className="flex size-full items-center gap-2"
    >
      <DropDown.Trigger
        targetRef={accessTypeRef}
        variant="icon"
        onClick={onClick}
      >
        <Icon view="0 -960 960 960" size={isSide ? 24 : 18}>
          {postType === 'journal' ? (
            <path d="M480-160q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740v484q51-32 107-48t113-16q36 0 70.5 6t69.5 18v-480q15 5 29.5 10.5T898-752q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59Zm80-200v-380l200-200v400L560-360Zm-160 65v-396q-33-14-68.5-21.5T260-720q-37 0-72 7t-68 21v397q35-13 69.5-19t70.5-6q36 0 70.5 6t69.5 19Zm0 0v-396 396Z" />
          ) : (
            <path d="M160-120q-33 0-56.5-23.5T80-200v-560q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v560q0 33-23.5 56.5T800-120H160Zm0-80h640v-560H160v560Zm80-80h480v-80H240v80Zm0-160h160v-240H240v240Zm240 0h240v-80H480v80Zm0-160h240v-80H480v80ZM160-200v-560 560Z" />
          )}
        </Icon>
      </DropDown.Trigger>
      <DropDown.Content
        initStatus="closed"
        ref={ref}
        onTransitionEnd={onTransitionEnd}
        className="p-1"
        position={isSide ? 'bottomRight' : 'topRight'}
      >
        <DropDown.Button
          variant="list"
          onClick={() => onChangePostType('journal')}
          className="flex gap-2"
        >
          감정 일기
          {postType === 'journal' && (
            <Icon view="0 -960 960 960" size={16}>
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </Icon>
          )}
        </DropDown.Button>
        <DropDown.Button
          variant="list"
          onClick={() => onChangePostType('article')}
          className="flex gap-2"
        >
          아티클
          {postType === 'article' && (
            <Icon view="0 -960 960 960" size={16}>
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </Icon>
          )}
        </DropDown.Button>
      </DropDown.Content>

      <ToolTip
        isHover={isHover}
        position={isSide ? 'topLeft' : 'bottomLeft'}
        text="게시물 종류"
        size="md"
        className="left-0"
      />
    </DropDown.Root>
  )
}
