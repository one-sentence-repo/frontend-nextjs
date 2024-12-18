'use client'

import Text from '@/src/components/shared/Text'
import Title from '@/src/components/shared/Title'
import { Tables } from '@/src/types/supabase'

interface Props {
  todo?: Tables<'todo'>
}

export default function IsCompleteSection({ todo }: Props) {
  return (
    <>
      <Title size="xs">완료 상태</Title>
      <Text>{todo?.is_complete ? '완료' : '미완료'}</Text>
    </>
  )
}
