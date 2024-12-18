'use client'

import Input from '@/src/components/shared/Input'
import { List } from '@/src/components/shared/List'
import Title from '@/src/components/shared/Title'
import { FormEvent, MouseEvent, useEffect, useRef, useState } from 'react'
import useDataDrivenAnimation from '@/src/hooks/useStateChange'
import Text from '@/src/components/shared/Text'
import Button from '@/src/components/shared/Button'
import Icon from '@/src/components/shared/Icon'
import useOutsideClick from '@/src/hooks/useOutsideClick'

import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { meQuery } from '@/src/services/queries/auth/me-query'
import Todo from '../../../_components/Todo'
import TaskOptionDropDown from '../../../_components/TaskOptionDropDown'
import { useInput } from '@/src/hooks/useInput'
import useAddTodo from '@/src/services/mutates/todo/useAddTodo'
import { Tables } from '@/src/types/supabase'
import useUpdateTodo from '@/src/services/mutates/todo/useUpdateTodo'
import { useRouter } from 'next/navigation'
import cn from '@/src/lib/cn'
import { todoFolderQuery } from '@/src/services/queries/todo/todo-folder-query'
import { todoQuery } from '@/src/services/queries/todo/todo-query'
import { XStack, YStack, ZStack } from '@/src/components/shared/Stack'
import { Container } from '@/src/components/shared/Container'

interface Props {
  params: { folderId: string }
  searchParams: { color: string }
}

export default function TaskForm({ params, searchParams }: Props) {
  const router = useRouter()
  const folderId = params.folderId
  const color = searchParams.color
  const [todoText, onChangeTodoText, setTodoText] = useInput('')
  const { onClick, ref, close, onTransitionEnd } =
    useDataDrivenAnimation<HTMLDivElement>()
  const dropdownRef = useOutsideClick<HTMLButtonElement>(close)
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))

  const { data: todoFolders } = useSuspenseQuery(
    todoFolderQuery.getTodoFolder(supabase, me!.userId),
  )
  const { data: fetchedTodos } = useSuspenseQuery(
    todoQuery.getTodoFromFolder(supabase, me!.userId, Number(folderId)),
  )
  const sortedTodos = fetchedTodos.sort((a, b) => a.index - b.index)
  const todos = sortedTodos.filter((todo) => todo.is_complete === false)
  const completedTodos = sortedTodos.filter((todo) => todo.is_complete === true)
  const currentFolder = todoFolders.find(
    (folder) => folder.id === Number(folderId),
  )
  const { mutate: addTodo } = useAddTodo()
  const { mutate: updateTodo } = useUpdateTodo()

  const [showCompletedZone, setShowCompletedZone] = useState(false)
  const dragItem = useRef<Tables<'todo'> | null>(null)
  const dragOverItem = useRef<Tables<'todo'> | null>(null)
  const completedZone = useRef<HTMLDivElement>(null)
  const inProgressZone = useRef<HTMLDivElement>(null)

  const currentMonth = new Date().getMonth() + 1
  const currentDate = new Date().getDate()
  const currentYear = new Date().getFullYear()

  const handleSubmitTodo = (e: FormEvent) => {
    e.preventDefault()
    const folderIndex = JSON.parse(localStorage.getItem(folderId)!)
    const currentIndex = folderIndex.in_progress ?? 0
    const nextIndex = Number(currentIndex) + 1
    const nextTodo = {
      name: todoText,
      folderId: currentFolder!.id,
      userId: me!.userId,
      index: nextIndex,
    }
    addTodo(nextTodo, {
      onSuccess: () => {
        setTodoText('')
      },
    })
  }

  const handleUpdateButtonClick = (
    e: MouseEvent,
    selectedTodo: Tables<'todo'>,
  ) => {
    e.stopPropagation()
    const folderIndex = JSON.parse(localStorage.getItem(folderId)!)
    const inProgressLastIndex = folderIndex.in_progress ?? 0
    const completedLastIndex = folderIndex.completed ?? 0

    if (selectedTodo.is_complete) {
      updateTodo({
        ...selectedTodo,
        updated_at: new Date().toISOString(),
        index: inProgressLastIndex + 1,
        is_complete: false,
      })
    } else {
      updateTodo({
        ...selectedTodo,
        updated_at: new Date().toISOString(),
        index: completedLastIndex + 1,
        is_complete: true,
      })
    }
  }

  useEffect(() => {
    const isCompletedTodo = completedTodos.length >= 1
    const willCompleted = dragItem.current !== null
    setShowCompletedZone(isCompletedTodo || willCompleted)

    const prevIndex = JSON.parse(localStorage.getItem(folderId)!)
    let inProgressLastIndex = prevIndex?.in_progress ?? 0
    let completedLastIndex = prevIndex?.completed ?? 0

    if (completedTodos) {
      completedLastIndex = completedTodos[completedTodos.length - 1]?.index
    }
    if (todos) {
      inProgressLastIndex = todos[todos.length - 1]?.index
    }

    const nextIndex = JSON.stringify({
      completed: completedLastIndex,
      in_progress: inProgressLastIndex,
    })
    localStorage.setItem(folderId, nextIndex)
  }, [todos, completedTodos])

  useEffect(() => {
    if (!currentFolder) {
      router.push('/todo/main')
    }
  }, [currentFolder])

  return (
    <div
      className={cn(
        'relative flex min-h-[calc(100dvh-64px)] w-full flex-col gap-4 overflow-y-auto rounded-md p-4 shadow-md',
        color === 'yellow' && 'bg-var-yellow/15 dark:bg-var-yellow/25',
        color === 'orange' && 'bg-var-orange/15 dark:bg-var-orange/25',
        color === 'black' && 'bg-black/15 dark:bg-black/25',
        color === 'blue' && 'bg-var-blue/15 dark:bg-var-blue/25',
        color === 'green' && 'bg-var-green/15 dark:bg-var-green/25',
        color === 'red' && 'bg-red-500/15 dark:bg-red-500/25',
        color === 'purple' && 'bg-purple-500/15 dark:bg-purple-500/25',
      )}
    >
      <form onSubmit={handleSubmitTodo}>
        <YStack gap={4}>
          <XStack className="items-center justify-between">
            <Title className="text-nowrap">{currentFolder?.name}</Title>
            <ZStack>
              <Button
                ref={dropdownRef}
                variant="icon"
                size="none"
                onClick={onClick}
              >
                <Icon view="0 -960 960 960" size={20}>
                  <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
                </Icon>
              </Button>
              <TaskOptionDropDown
                folderId={currentFolder?.id}
                targetRef={ref}
                onTransitionEnd={onTransitionEnd}
              />
            </ZStack>
          </XStack>
          <YStack>
            <ZStack>
              <Input
                value={todoText}
                onChange={onChangeTodoText}
                placeholder="할일을 입력하세요."
                dimension="sm"
                className="sticky w-full"
              />
              <Button
                variant="icon"
                size="none"
                type="submit"
                disabled={!todoText}
                className="absolute right-2 top-1/2 -translate-y-1/2 active:animate-none"
              >
                <Icon view="0 -960 960 960" size={18}>
                  <path d="M440-160v-326L336-382l-56-58 200-200 200 200-56 58-104-104v326h-80ZM160-600v-120q0-33 23.5-56.5T240-800h480q33 0 56.5 23.5T800-720v120h-80v-120H240v120h-80Z" />
                </Icon>
              </Button>
            </ZStack>
            <Text type="caption" size="sm" className="text-nowrap">
              {`${currentYear}년 ${currentMonth}월 ${currentDate}일 오늘 할 일`}
            </Text>
          </YStack>
          <YStack gap={4} className="sm:flex-row">
            {todos.length >= 1 && (
              <Container
                ref={inProgressZone}
                className="flex w-full animate-fade-in flex-col gap-4 border border-transparent transition sm:w-72"
              >
                <YStack>
                  <Title type="sub" className="text-nowrap">
                    할 일
                  </Title>
                  <List className="flex flex-col gap-2">
                    {todos.map((todo) => (
                      <Todo
                        isDraggable
                        key={todo.id}
                        todo={todo}
                        isComplete={todo.is_complete}
                        folderColor={currentFolder?.color || ''}
                        onUpdate={handleUpdateButtonClick}
                        dragItem={dragItem}
                        dragOverItem={dragOverItem}
                        orderFrom="folder"
                      />
                    ))}
                  </List>
                </YStack>
              </Container>
            )}
            {showCompletedZone && (
              <Container
                ref={completedZone}
                className="flex w-full animate-fade-in flex-col gap-4 border border-transparent transition sm:w-72"
              >
                <YStack>
                  <Title type="sub" className="text-nowrap">
                    완료됨
                  </Title>
                  <List className="flex flex-col gap-2">
                    {completedTodos.map((todo) => (
                      <Todo
                        isDraggable
                        key={todo.id}
                        todo={todo}
                        isComplete={todo.is_complete}
                        folderColor={currentFolder?.color || ''}
                        onUpdate={handleUpdateButtonClick}
                        dragItem={dragItem}
                        dragOverItem={dragOverItem}
                        orderFrom="folder"
                      />
                    ))}
                  </List>
                </YStack>
              </Container>
            )}
          </YStack>
        </YStack>
      </form>
    </div>
  )
}
