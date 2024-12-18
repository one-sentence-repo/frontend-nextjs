'use client'

import Modal from '@/src/components/shared/Modal'
import Text from '@/src/components/shared/Text'
import { FormEvent, useEffect, useState } from 'react'
import Input from '@/src/components/shared/Input'
import Button from '@/src/components/shared/Button'
import { useInput } from '@/src/hooks/useInput'
import cn from '@/src/lib/cn'
import Icon from '@/src/components/shared/Icon'
import { useRouter } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import useUpdateTodoFolder from '@/src/services/mutates/todo/useUpdateTodoFolder'
import { todoFolderQuery } from '@/src/services/queries/todo/todo-folder-query'
import useMe from '@/src/hooks/useMe'

interface Props {
  params: { folderId: string }
}

const colors = ['black', 'green', 'yellow', 'blue', 'orange', 'red', 'purple']

export default function EditTodoFolderModal({ params }: Props) {
  const folderId = params.folderId
  const router = useRouter()
  const { me } = useMe()
  const { data: folders } = useSuspenseQuery(
    todoFolderQuery.getTodoFolder(supabase, me.id),
  )
  const folder = folders.find((item) => item.id === Number(folderId))
  const [name, onChangeName, setName] = useInput<string>('')
  const [color, setColor] = useState<string>('black')
  const { mutate: updateTodoFolder } = useUpdateTodoFolder()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    updateTodoFolder({ ...folder!, name, color })
    router.back()
  }

  const handleColorClick = (selectedColor: string) => {
    setColor(selectedColor)
  }

  useEffect(() => {
    setName(folder!.name)
    setColor(folder!.color)
  }, [folder])

  return (
    <Modal>
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Text>폴더명</Text>
          <Input
            value={name}
            onChange={onChangeName}
            className="dark:bg-var-dark"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Text>색상</Text>
          <div className="flex gap-2">
            {colors.map((prefaredColor) => (
              <Button
                key={prefaredColor}
                variant="none"
                onClick={() => handleColorClick(prefaredColor)}
                className={cn(
                  'relative size-4 rounded-full',
                  prefaredColor === 'yellow' && 'bg-var-yellow',
                  prefaredColor === 'orange' && 'bg-var-orange',
                  prefaredColor === 'black' && 'bg-var-black',
                  prefaredColor === 'blue' && 'bg-var-blue',
                  prefaredColor === 'green' && 'bg-var-green',
                  prefaredColor === 'red' && 'bg-red-500',
                  prefaredColor === 'purple' && 'bg-purple-500',
                )}
              >
                {prefaredColor === color && (
                  <Icon size={18} view={20} className="absolute text-white">
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </Icon>
                )}
              </Button>
            ))}
          </div>
        </div>
        <Button
          type="submit"
          disabled={folder?.name === name && folder?.color === color}
        >
          수정하기
        </Button>
      </form>
    </Modal>
  )
}
