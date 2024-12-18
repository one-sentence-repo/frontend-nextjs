'use client'

import cn from '@/src/lib/cn'
import TaskFolderSection from './_components/TaskFolderSection'
import { TodoFolder } from '@/src/types/todo'
import { usePathname } from 'next/navigation'
import Line from '@/src/components/shared/Line'
import { List } from '@/src/components/shared/List'
import { TODO_MENU } from '../_constants'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { todoFolderQuery } from '@/src/services/queries/todo/todo-folder-query'
import useMe from '@/src/hooks/useMe'
import { routes } from '@/src/routes'
import { Container } from '@/src/components/shared/Container'
import { YStack } from '@/src/components/shared/Stack'
import MenuButton from '../../@sidebar/_components/MenuButton'

export const INIT_TODO_FOLDER: TodoFolder = {
  id: 0,
  name: '새로운 폴더',
  createdAt: 0,
  updatedAt: 0,
  dotColor: 'black',
  index: 0,
}

interface Props {
  searchParams: { folder_id: string; color?: string }
}

export default function SideBarPage({ searchParams }: Props) {
  const pathname = usePathname()
  const { me } = useMe()
  const { data: todoFolders } = useSuspenseQuery(
    todoFolderQuery.getTodoFolder(supabase, me?.id),
  )

  return (
    <Container
      className={cn(
        'sticky left-4 top-8 hidden h-fit animate-fade-in-reverse rounded-md bg-white p-2 shadow-md max-lg:fixed sm:flex dark:bg-var-darkgray',
      )}
    >
      <div className="absolute left-0 top-0 -z-10 hidden h-full w-72 origin-left bg-white transition ease-in-out dark:bg-var-darkgray" />
      <YStack>
        <List className="flex flex-col gap-2">
          {TODO_MENU.map((menu) => (
            <MenuButton
              key={menu.id}
              isSelected={pathname === menu.path}
              icon={menu.icon}
              name={menu.name}
              path={menu.path}
            />
          ))}
        </List>
        <Line />
        <TaskFolderSection todoFolders={todoFolders} />
        <MenuButton
          name="할일 폴더 추가"
          path={routes.modal.todo.post}
          isSelected={pathname === routes.modal.todo.post}
          icon={
            <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
          }
        />
      </YStack>
    </Container>
  )
}
