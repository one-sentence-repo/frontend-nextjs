import { wait } from '@/src/utils/wait'
import { useRef } from 'react'

export default function useDataDrivenAnimation<T extends HTMLElement>(
  initClass: string = 'hidden',
) {
  const ref = useRef<T>(null)

  const open = async () => {
    const element = ref.current
    if (element) {
      element.classList.remove(initClass)
      await wait(10)
      element.setAttribute('data-status', 'opened')
    }
  }

  const close = async () => {
    await wait(10)
    ref.current?.setAttribute('data-status', 'closed')
  }

  const handleTransitionEnd = () => {
    const element = ref.current
    if (
      element?.getAttribute('data-status') === 'closed' &&
      !element.classList.contains(initClass)
    ) {
      element.classList.add(initClass)
    }
  }

  const handleButtonClick = () => {
    const isOpen = ref.current?.getAttribute('data-status')

    if (isOpen === 'opened') {
      close()
    } else if (isOpen === 'closed') {
      open()
    }
  }

  return {
    ref,
    open,
    close,
    onTransitionEnd: handleTransitionEnd,
    onClick: handleButtonClick,
  }
}
