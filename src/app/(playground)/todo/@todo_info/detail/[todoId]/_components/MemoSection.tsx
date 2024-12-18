'use client'

import Button from '@/src/components/shared/Button'
import TextArea from '@/src/components/shared/TextArea'
import Title from '@/src/components/shared/Title'
import { useInput } from '@/src/hooks/useInput'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { queryKey } from '@/src/lib/tanstack/query-key'
import useUpdateTodo from '@/src/services/mutates/todo/useUpdateTodo'
import { Tables } from '@/src/types/supabase'
import { FormEvent, useEffect } from 'react'

interface Props {
  todo?: Tables<'todo'>
}

export default function MemoSection({ todo }: Props) {
  const queryClient = getQueryClient()

  const [memo, onChangeMemo, setMemo] = useInput<string>('')

  const { mutate: updateTodo } = useUpdateTodo()

  const handleSubmitMemo = (e: FormEvent) => {
    e.preventDefault()
    updateTodo(
      { ...todo!, memo, updated_at: new Date().toISOString() },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: queryKey.todo.inProgress })
        },
      },
    )
  }

  useEffect(() => {
    setMemo(todo?.memo ?? '')
  }, [todo])

  return (
    <form onSubmit={handleSubmitMemo} className="flex flex-col gap-4">
      <Title size="xs">메모</Title>
      <TextArea
        value={memo}
        onChange={onChangeMemo}
        placeholder="메모를 입력하세요."
        className="p-2 ring-1 ring-zinc-200 dark:ring-zinc-600"
      />
      <Button
        variant="secondary"
        type="submit"
        disabled={!memo || memo === todo?.memo}
        className="self-end"
      >
        메모 추가
      </Button>
    </form>
  )
}
