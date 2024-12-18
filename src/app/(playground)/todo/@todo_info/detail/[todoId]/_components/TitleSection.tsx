'use client'

import Button from '@/src/components/shared/Button'
import Icon from '@/src/components/shared/Icon'
import TextArea from '@/src/components/shared/TextArea'
import Title from '@/src/components/shared/Title'
import { useInput } from '@/src/hooks/useInput'
import useUpdateTodo from '@/src/services/mutates/todo/useUpdateTodo'
import { Tables } from '@/src/types/supabase'
import { useRef, useState } from 'react'

interface Props {
  todo?: Tables<'todo'>
}

export default function TitleSection({ todo }: Props) {
  const [showInput, setShowInput] = useState(false)
  const [name, onChangeName] = useInput<string>(todo?.name ?? '')
  const ref = useRef<HTMLTextAreaElement>(null)

  const { mutate: updateTodo } = useUpdateTodo()

  const handleChangeInput = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowInput(true)

    setTimeout(() => {
      ref.current?.focus()
    }, 0)
  }

  const handleUpdateName = () => {
    setShowInput(false)
    if (todo?.name !== name) {
      updateTodo({ ...todo!, name, updated_at: new Date().toISOString() })
    }
  }

  return (
    <div
      onClick={handleChangeInput}
      className="relative w-full justify-between"
    >
      {showInput ? (
        <TextArea
          targetRef={ref}
          value={name}
          onChange={onChangeName}
          onBlur={handleUpdateName}
          className="w-full text-lg font-semibold text-zinc-600 dark:text-zinc-200"
        />
      ) : (
        <Title size="sm" className="hyphens-auto break-all">
          {todo?.name}
        </Title>
      )}
      {!showInput && (
        <Button
          variant="icon"
          size="none"
          className="absolute bottom-0 right-2"
        >
          <Icon view="0 -960 960 960" size={20}>
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z" />
          </Icon>
        </Button>
      )}
    </div>
  )
}
