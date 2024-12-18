import { DropDown } from '@/src/components/shared/DropDown'
import Icon from '@/src/components/shared/Icon'
import ToolTip from '@/src/components/shared/Tooltip'
import useOutsideClick from '@/src/hooks/useOutsideClick'
import useDataDrivenAnimation from '@/src/hooks/useStateChange'
import useToggle from '@/src/hooks/useToggle'
import { useToast } from '@/src/store/useToast'
import { isServer } from '@tanstack/react-query'
import { MouseEvent } from 'react'

interface Props {
  isSide?: boolean
  viewToolTip?: boolean
}

export default function ShareButton({ isSide, viewToolTip }: Props) {
  const { close, ref, onClick, onTransitionEnd } =
    useDataDrivenAnimation<HTMLDivElement>()
  const buttonRef = useOutsideClick<HTMLButtonElement>(close)
  const { isOpen: isHover, open: hover, close: leave } = useToggle()
  const { openToast } = useToast()

  const handleButtonClick = (e: MouseEvent) => {
    e.stopPropagation()
    onClick()
  }

  const copyURL = async () => {
    const fullURL = !isServer ? window.location.href : ''
    await navigator.clipboard.writeText(fullURL)
    openToast({ text: '주소가 복사되었습니다.', type: 'info' })
  }

  return (
    <DropDown.Root onMouseEnter={hover} onMouseLeave={leave}>
      <DropDown.Trigger
        targetRef={buttonRef}
        onClick={handleButtonClick}
        size={isSide ? 'md' : 'icon'}
        className="hover:text-green-400 dark:hover:text-green-400"
      >
        <Icon view="0 -960 960 960" size={isSide ? 24 : 18}>
          <path d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z" />
        </Icon>
      </DropDown.Trigger>
      <DropDown.Content
        ref={ref}
        initStatus="closed"
        position="topRight"
        onTransitionEnd={onTransitionEnd}
        className="p-1"
      >
        <DropDown.Button onClick={copyURL} variant="list" className="gap-2">
          <Icon view="0 -960 960 960" size={16}>
            <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
          </Icon>
          URL 복사
        </DropDown.Button>
      </DropDown.Content>
      {viewToolTip && <ToolTip isHover={isHover} text="공유 하기" />}
    </DropDown.Root>
  )
}
