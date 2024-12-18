import { ReactNode, useTransition } from 'react'
import cn from '@/src/lib/cn'
import { useRouter } from 'next/navigation'
import Icon from '@/src/components/shared/Icon'
import BookMark from './BookMark'
import Button from '@/src/components/shared/Button'
import Spinner from '@/src/components/shared/Spinner'
import Text from '@/src/components/shared/Text'
import SelectedMenuBackground from './SelectedMenuBackground'
import { wait } from '@/src/utils/wait'
import { ZStack } from '@/src/components/shared/Stack'

interface Props {
  isSelected: boolean
  icon: ReactNode
  name: string
  path: string
  close?: () => void
  viewText?: boolean
  className?: string
  closeToolTip?: () => void
}

export default function MenuButton({
  isSelected,
  icon,
  viewText,
  name,
  close,
  path,
  className,
  closeToolTip,
}: Props) {
  const router = useRouter()
  const [isLoading, startTransition] = useTransition()

  const handleButtonClick = async () => {
    router.push(path)
    await wait(100)
    closeToolTip && closeToolTip()
    close && close()
  }

  return (
    <ZStack className={cn('justify-center', className)}>
      <BookMark isSelected={isSelected} />
      <Button
        variant="icon"
        onClick={() => startTransition(() => handleButtonClick())}
        className="relative size-full justify-start gap-4"
      >
        <SelectedMenuBackground isSelected={isSelected} />
        {isLoading ? (
          <Spinner size={24} />
        ) : (
          <Icon view="0 -960 960 960" size={24} className="flex flex-shrink-0">
            {icon}
          </Icon>
        )}
        {viewText && <Text type={isSelected ? 'body' : 'caption'}>{name}</Text>}
      </Button>
    </ZStack>
  )
}
