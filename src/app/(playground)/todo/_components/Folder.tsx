import { useRouter } from 'next/navigation'
import {
  DragEvent,
  MutableRefObject,
  useRef,
  useState,
  useTransition,
} from 'react'
import cn from '@/src/lib/cn'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { Tables } from '@/src/types/supabase'
import { meQuery } from '@/src/services/queries/auth/me-query'
import useUpdateTodoFolder from '@/src/services/mutates/todo/useUpdateTodoFolder'
import useOutsideClick from '@/src/hooks/useOutsideClick'
import useDataDrivenAnimation from '@/src/hooks/useStateChange'

import Button from '@/src/components/shared/Button'
import FolderDropDown from './FolderDropDown'
import { List } from '@/src/components/shared/List'
import { Dot } from './Dot'
import Spinner from '@/src/components/shared/Spinner'
import { todoFolderQuery } from '@/src/services/queries/todo/todo-folder-query'

interface Props {
  isSelected: boolean
  folder: Tables<'todo_folder'>
  dragItem: MutableRefObject<Tables<'todo_folder'> | null>
  dragOverItem: MutableRefObject<Tables<'todo_folder'> | null>
}

export default function Folder({
  isSelected = false,
  folder,
  dragItem,
  dragOverItem,
}: Props) {
  const router = useRouter()
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: todoFolders } = useSuspenseQuery(
    todoFolderQuery.getTodoFolder(supabase, me!.userId),
  )
  const { mutate: updateTodoFolder } = useUpdateTodoFolder()
  const {
    ref: dropdownRef,
    close,
    onClick,
    onTransitionEnd,
  } = useDataDrivenAnimation<HTMLDivElement>()
  const dropdownButtonRef = useOutsideClick<HTMLButtonElement>(close)
  const [showKebabButton, setShowKebabButton] = useState(false)
  const folderRef = useRef<HTMLLIElement>(null)
  const [isLoading, startTransition] = useTransition()

  const handleFolderClick = () => {
    router.push(`/todo/custom_task/${folder.id}?color=${folder.color}`)
  }

  const dragStart = () => {
    dragItem.current = folder
  }

  const dragEnter = (targetFolder: Tables<'todo_folder'>) => {
    dragOverItem.current = targetFolder

    const isDraggingDown = dragItem.current!.index < dragOverItem.current!.index
    if (isDraggingDown) {
      folderRef.current?.classList.add('border-b-blue-500')
    } else if (!isDraggingDown) {
      folderRef.current?.classList.add('border-t-blue-500')
    }
  }

  const dragOver = (e: DragEvent) => {
    e.preventDefault()
    const isDraggingDown = dragItem.current!.index < dragOverItem.current!.index
    if (isDraggingDown) {
      folderRef.current?.classList.add('border-b-blue-500')
    } else if (!isDraggingDown) {
      folderRef.current?.classList.add('border-t-blue-500')
    }
  }

  const dragLeave = () => {
    folderRef.current?.classList.remove('border-t-blue-500')
    folderRef.current?.classList.remove('border-b-blue-500')
  }

  const drop = async () => {
    folderRef.current?.classList.remove('border-t-blue-500')
    folderRef.current?.classList.remove('border-b-blue-500')
    const isEqual = dragItem.current!.index === dragOverItem.current!.index
    if (isEqual) return null

    let targetItemList
    let sortedList
    let updatedIndexFolder

    if (dragItem.current!.index < dragOverItem.current!.index) {
      targetItemList = todoFolders.filter(
        (folder) =>
          folder.index !== dragItem.current!.index &&
          folder.index <= dragOverItem.current!.index,
      )
      sortedList = targetItemList.map((item) => ({
        ...item,
        index: item.index - 1,
      }))
      updatedIndexFolder = {
        ...dragItem.current!,
        index: dragOverItem.current!.index,
      }
    } else {
      targetItemList = todoFolders.filter(
        (folder) =>
          folder.index !== dragItem.current!.index &&
          folder.index >= dragOverItem.current!.index,
      )
      sortedList = targetItemList.map((item) => ({
        ...item,
        index: item.index + 1,
      }))
      updatedIndexFolder = {
        ...dragItem.current!,
        index: dragOverItem.current!.index,
      }
    }

    sortedList.forEach((item) => {
      updateTodoFolder({
        name: item.name,
        color: item.color,
        index: item.index,
        id: item.id,
      })
    })
    updateTodoFolder({
      name: updatedIndexFolder.name,
      color: updatedIndexFolder.color,
      index: updatedIndexFolder.index,
      id: updatedIndexFolder.id,
    })
    dragOverItem.current = null
  }

  const dragEnd = () => {
    dragItem.current = null
    dragOverItem.current = null
  }

  return (
    <List.Row
      draggable
      targetRef={folderRef}
      onDragStart={dragStart}
      onDragEnter={() => dragEnter(folder)}
      onDragLeave={dragLeave}
      onDragEnd={dragEnd}
      onDrop={drop}
      onDragOver={dragOver}
      className="relative size-full animate-fade-in border border-transparent transition"
    >
      <Button
        variant="list"
        onClick={() => startTransition(() => handleFolderClick())}
        ref={dropdownButtonRef}
        className="flex h-10 w-full justify-center p-4"
        onMouseEnter={() => setShowKebabButton(true)}
        onMouseLeave={() => setShowKebabButton(false)}
      >
        <div
          className={cn(
            'relative flex size-2 items-center justify-center rounded-full text-zinc-400 transition',
            isSelected && 'ring-8 ring-zinc-200 dark:ring-zinc-600',
          )}
        >
          <div className="absolute">
            {isLoading ? <Spinner size={18} /> : <Dot color={folder.color} />}
          </div>
        </div>
      </Button>
      <FolderDropDown
        targetRef={dropdownRef}
        onTransitionEnd={onTransitionEnd}
        folderId={folder.id}
      />
    </List.Row>
  )
}
