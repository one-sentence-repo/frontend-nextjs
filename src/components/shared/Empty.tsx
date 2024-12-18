import { PropsWithChildren } from 'react'
import cn from '@/src/lib/cn'
import Text from './Text'
import Icon, { IconProps } from './Icon'
import Button from './Button'

interface Props {
  className?: string
}

const Empty = ({ children, className }: PropsWithChildren<Props>) => {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-center rounded-md bg-white py-12 opacity-65 shadow-sm dark:bg-var-darkgray',
        className,
      )}
    >
      {children}
    </div>
  )
}

const EmptyText = ({ children }: PropsWithChildren) => {
  return <Text type="caption">{children}</Text>
}

interface Icon extends IconProps {}

const EmptyIcon = ({ children, ...props }: PropsWithChildren<IconProps>) => {
  return (
    <Button disabled variant="icon" size="icon">
      <Icon {...props}>{children}</Icon>
    </Button>
  )
}

Empty.Text = EmptyText
Empty.Icon = EmptyIcon

export default Empty
