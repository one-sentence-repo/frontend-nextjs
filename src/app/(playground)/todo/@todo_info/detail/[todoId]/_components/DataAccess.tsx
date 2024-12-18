'use client'

import Line from '@/src/components/shared/Line'
import TitleSection from './TitleSection'
import DateSection from './DateSection'
import MemoSection from './MemoSection'
import IsCompleteSection from './IsCompleteSection'
import ButtonSection from './ButtonSection'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { meQuery } from '@/src/services/queries/auth/me-query'
import { todoQuery } from '@/src/services/queries/todo/todo-query'

interface Props {
  todoId: string
  folderId: string
  orderFrom: 'main' | 'folder'
  color: string
}

export default function DataAccess({
  todoId,
  folderId,
  orderFrom,
  color,
}: Props) {
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: todos } = useSuspenseQuery(
    todoQuery.getTodoFromFolder(supabase, me!.userId, Number(folderId)),
  )
  const todo = todos ? todos?.find((item) => item.id === Number(todoId)) : null

  if (!todo) return null

  return (
    <>
      <TitleSection todo={todo} />
      <div className="flex flex-1 flex-col gap-4">
        <Line />
        <DateSection todo={todo} />
        <Line />
        <MemoSection todo={todo} />
        <Line />
        <IsCompleteSection todo={todo} />
      </div>
      <ButtonSection
        todoId={todoId}
        folderId={folderId}
        todo={todo}
        orderFrom={orderFrom}
        color={color}
      />
    </>
  )
}
