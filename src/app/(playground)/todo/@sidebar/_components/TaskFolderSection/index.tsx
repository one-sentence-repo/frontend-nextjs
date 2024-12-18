'use client'

import { List } from '@/src/components/shared/List'
import { useRef } from 'react'
import Folder from '../../../_components/Folder'
import { Tables } from '@/src/types/supabase'
import { useParams } from 'next/navigation'

interface Props {
  todoFolders?: Tables<'todo_folder'>[]
}

export default function TaskFolderSection({ todoFolders }: Props) {
  const { folderId } = useParams()
  const dragItem = useRef<Tables<'todo_folder'> | null>(null)
  const dragOverItem = useRef<Tables<'todo_folder'> | null>(null)
  const sortedFolders = todoFolders?.sort((a, b) => a.index - b.index)

  return (
    <List className="flex flex-col gap-2">
      {sortedFolders?.map((folder) => (
        <Folder
          key={folder.id}
          folder={folder}
          isSelected={Number(folderId) === folder.id}
          dragItem={dragItem}
          dragOverItem={dragOverItem}
        />
      ))}
    </List>
  )
}
