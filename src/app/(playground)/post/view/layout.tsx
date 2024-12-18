import { ZStack } from '@/src/components/shared/Stack'
import { ReactNode } from 'react'

interface Props {
  post: ReactNode
  side_menu: ReactNode
}

export default function Layout({ post, side_menu }: Props) {
  return (
    <ZStack gap={8}>
      {post}
      {side_menu}
    </ZStack>
  )
}
