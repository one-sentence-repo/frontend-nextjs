import { FormEvent, MouseEvent, useEffect, useRef, useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import cn from '@/src/lib/cn'

import { todoQuery } from '@/src/services/queries/todo/todo-query'
import useAddTodo from '@/src/services/mutates/todo/useAddTodo'
import useUpdateTodo from '@/src/services/mutates/todo/useUpdateTodo'
import { Tables } from '@/src/types/supabase'
import { useInput } from '@/src/hooks/useInput'
import useOutsideClick from '@/src/hooks/useOutsideClick'
import useDataDrivenAnimation from '@/src/hooks/useStateChange'

import Input from '@/src/components/shared/Input'
import Button from '@/src/components/shared/Button'
import Icon from '@/src/components/shared/Icon'
import { List } from '@/src/components/shared/List'
import Title from '@/src/components/shared/Title'
import LinkButton from '@/src/components/shared/LinkButton'
import TaskOptionDropDown from './TaskOptionDropDown'
import Todo from './Todo'
import { routes } from '@/src/routes'

interface TodoFolderCardProps {
  folder: Tables<'todo_folder'>
  userId: string
}

export default function TodoFolderCard({
  folder,
  userId,
}: TodoFolderCardProps) {
  const queryClient = getQueryClient()
  const { data: todos } = useSuspenseQuery(
    todoQuery.getTodoInProgress(supabase, userId),
  )
  const localTodos = todos?.filter((todo) => todo.folder_id === folder.id)
  const { ref, onClick, onTransitionEnd, close } =
    useDataDrivenAnimation<HTMLDivElement>()
  const dropdownRef = useOutsideClick<HTMLButtonElement>(close)
  const [name, onChangeName, setName] = useInput<string>('')

  const [showInput, setShowInput] = useState(false)
  const { mutate: addTodo } = useAddTodo()
  const { mutate: updateTodo } = useUpdateTodo()
  const dragItem = useRef(null)
  const dragOverItem = useRef(null)

  const handleUpdateButtonClick = (
    e: MouseEvent,
    selectedTodo: Tables<'todo'>,
  ) => {
    updateTodo(
      { ...selectedTodo, is_complete: true },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['todo'] })
        },
      },
    )
  }

  const handleSubmitTodo = (e: FormEvent) => {
    const nextIndex = Number(localStorage.getItem('todo-index')) || 0
    e.preventDefault()
    addTodo(
      { name, folderId: folder.id, userId, index: nextIndex + 1 },
      {
        onSuccess: () => {
          setName('')
          queryClient.invalidateQueries({ queryKey: ['todo'] })
        },
      },
    )
    localStorage.setItem('todo-index', (nextIndex + 1).toString())
  }

  useEffect(() => {
    const prevIndex = JSON.parse(localStorage.getItem(folder.id.toString())!)
    let inProgressLastIndex = prevIndex?.in_progress ?? 0
    let completedLastIndex = prevIndex?.completed ?? 0

    if (todos) {
      inProgressLastIndex = todos[todos.length - 1]?.index
    }

    const nextIndex = JSON.stringify({
      completed: completedLastIndex,
      in_progress: inProgressLastIndex,
    })
    localStorage.setItem(folder.id.toString(), nextIndex)
  }, [todos])

  return (
    <List.Row
      className={cn(
        'h-fit w-full max-w-72 rounded-md p-4 shadow-md',
        folder?.color === 'yellow' && 'bg-var-yellow/15 dark:bg-var-yellow/25',
        folder?.color === 'orange' && 'bg-var-orange/15 dark:bg-var-orange/25',
        folder?.color === 'black' && 'bg-black/15 dark:bg-black/25',
        folder?.color === 'blue' && 'bg-var-blue/15 dark:bg-var-blue/25',
        folder?.color === 'green' && 'bg-var-green/15 dark:bg-var-green/25',
        folder?.color === 'red' && 'bg-red-500/15 dark:bg-red-500/25',
        folder?.color === 'purple' && 'bg-purple-500/15 dark:bg-purple-500/25',
      )}
    >
      <div className="relative flex items-center justify-between gap-4">
        <LinkButton
          variant="teritory"
          size="none"
          href={routes.todo.view.folder(folder.id,folder.color)}
          innerClassName="justify-start"
        >
          <Title size="sm" className="line-clamp-1">
            {folder?.name}
          </Title>
        </LinkButton>
        <div className="flex">
          <Button
            variant="icon"
            size="none"
            onClick={() => setShowInput((prev) => !prev)}
            className="p-1"
          >
            <Icon view="0 -960 960 960" size={20}>
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </Icon>
          </Button>
          <Button
            ref={dropdownRef}
            variant="icon"
            size="none"
            onClick={onClick}
            className="p-1"
          >
            <Icon view="0 -960 960 960" size={20}>
              <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
            </Icon>
          </Button>
        </div>
        <TaskOptionDropDown
          folderId={folder?.id}
          targetRef={ref}
          onTransitionEnd={onTransitionEnd}
        />
      </div>
      {(showInput || localTodos.length === 0) && (
        <form
          onSubmit={handleSubmitTodo}
          className="relative mt-2 flex flex-col gap-2"
        >
          <Input
            value={name}
            onChange={onChangeName}
            variant="primary"
            className="w-full pr-8 text-xs"
            placeholder="새로운 할일을 추가하세요."
          />
          <Button
            variant="icon"
            size="none"
            type="submit"
            disabled={!name}
            className="absolute right-2 top-1/2 -translate-y-1/2 active:animate-none"
          >
            <Icon view="0 -960 960 960" size={18}>
              <path d="M440-160v-326L336-382l-56-58 200-200 200 200-56 58-104-104v326h-80ZM160-600v-120q0-33 23.5-56.5T240-800h480q33 0 56.5 23.5T800-720v120h-80v-120H240v120h-80Z" />
            </Icon>
          </Button>
        </form>
      )}
      <div className="mt-4 flex flex-col gap-4 text-left">
        {localTodos?.length! >= 1 && (
          <List className="flex animate-fade-in flex-col gap-2">
            {localTodos?.map((todo) => (
              <Todo
                key={todo.id}
                dragItem={dragItem}
                dragOverItem={dragOverItem}
                todo={todo}
                isComplete={todo.is_complete}
                onUpdate={handleUpdateButtonClick}
                orderFrom='main'
                folderColor={folder.color}
              />
            ))}
          </List>
        )}
      </div>
    </List.Row>
  )
}
