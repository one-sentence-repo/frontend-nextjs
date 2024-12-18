import useDataDrivenAnimation from '@/src/hooks/useStateChange'
import cn from '@/src/lib/cn'
import { colorTheme, useTheme } from '@/src/store/useTheme'
import { useEffect } from 'react'

interface Props {
  isSelected?: boolean
}

export default function SelectedMenuBackground({ isSelected }: Props) {
  const { color } = useTheme()
  const { ref, close, open } = useDataDrivenAnimation<HTMLDivElement>()

  useEffect(() => {
    isSelected ? open() : close()
  }, [isSelected])

  return (
    <div
      ref={ref}
      data-status="closed"
      className={cn(
        colorTheme({ color }),
        'absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 rounded-xl opacity-25 transition duration-300 ease-in-out data-[status=closed]:scale-0',
      )}
    />
  )
}
