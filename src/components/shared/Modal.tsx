'use client'

import { useRouter } from 'next/navigation'
import { ComponentProps, PropsWithChildren, useEffect, useRef } from 'react'
import useDataDrivenAnimation from '@/src/hooks/useStateChange'
import cn from '@/src/lib/cn'

interface Props extends ComponentProps<'div'> {
  className?: string
  as?: 'div'
}

export default function Modal({
  as: Component = 'div',
  children,
  className,
  ...props
}: PropsWithChildren<Props>) {
  const router = useRouter()
  const isMouseDown = useRef<boolean>(false)
  const {
    close: closeInside,
    open: openInside,
    ref: insideRef,
    onTransitionEnd: insideOnTransitionEnd,
  } = useDataDrivenAnimation<HTMLDivElement>()
  const {
    close: closeOutside,
    open: openOutside,
    ref: outsideRef,
    onTransitionEnd: outsideOnTransitionEnd,
  } = useDataDrivenAnimation<HTMLDivElement>()

  const handleMouseDown = () => {
    isMouseDown.current = true
  }

  const handleMouseUp = () => {
    if (isMouseDown.current) {
      closeInside()
      closeOutside()
      setTimeout(() => router.back(), 100)
    }
    isMouseDown.current = false
  }

  useEffect(() => {
    document.body.classList.add('overflow-hidden')
    openInside()
    openOutside()

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [])

  return (
    <>
      <div
        ref={outsideRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        data-status="closed"
        onTransitionEnd={outsideOnTransitionEnd}
        className="fixed inset-0 z-40 overflow-hidden bg-var-dark/25 backdrop-blur-sm transition-opacity ease-in-out data-[status=closed]:opacity-0 dark:bg-var-gray/25"
      />
      <div
        ref={insideRef}
        data-status="closed"
        onTransitionEnd={insideOnTransitionEnd}
        className={cn(
          'fixed left-1/2 top-1/2 z-50 flex max-h-[calc(100%-200px)] w-full max-w-[calc(100%-20px)] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-12 overflow-y-auto rounded-md bg-var-lightgray p-8 shadow-lg transition-transform data-[status=closed]:scale-90 data-[status=closed]:opacity-0 sm:max-w-[600px] dark:bg-var-dark',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </>
  )
}
