'use client'

import Button from './Button'
import Icon from './Icon'
import cn from '@/src/lib/cn'
import { useRouter } from 'next/navigation'

interface Props {
  className?: string
}

export default function ExpandButton({ className }: Props) {
  const router = useRouter()

  const handleButtonClick = () => {
    window.location.reload()
  }

  return (
    <Button
      variant="icon"
      size="none"
      onClick={handleButtonClick}
      className={cn('p-1', className)}
    >
      <Icon view="0 -960 960 960" size={14}>
        <path d="M120-120v-320h80v184l504-504H520v-80h320v320h-80v-184L256-200h184v80H120Z" />
      </Icon>
    </Button>
  )
}
