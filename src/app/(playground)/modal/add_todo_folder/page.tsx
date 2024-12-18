'use client'

import { FormEvent, useState } from 'react'
import cn from '@/src/lib/cn'
import { useRouter } from 'next/navigation'
import useAddTodoFolder from '@/src/services/mutates/todo/useAddTodoFolder'
import { TTodoColor } from '@/src/types/todo'
import { useInput } from '@/src/hooks/useInput'
import useMe from '@/src/hooks/useMe'
import Modal from '@/src/components/shared/Modal'
import Text from '@/src/components/shared/Text'
import Input from '@/src/components/shared/Input'
import Button from '@/src/components/shared/Button'
import Icon from '@/src/components/shared/Icon'

const colors: TTodoColor[] = [
  'black',
  'green',
  'yellow',
  'blue',
  'orange',
  'red',
  'purple',
]

export default function AddTodoFolderModal() {
  const router = useRouter()
  const { me } = useMe()
  const [name, onChangeName] = useInput('')
  const [color, setColor] = useState<TTodoColor>('black')
  const { mutate: addTodoFolder } = useAddTodoFolder()

  const handleColorClick = (selectedColor: TTodoColor) => {
    setColor(selectedColor)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const currentIndex = localStorage.getItem('todo-folder-index') || 0
    const nextIndex = Number(currentIndex) + 1
    const newFolder = {
      name,
      color,
      index: nextIndex,
      userId: me?.id,
    }
    addTodoFolder(newFolder)
    localStorage.setItem('todo-folder-index', nextIndex.toString())
    router.back()
  }

  return (
    <Modal>
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-8">
        <div className="flex flex-col gap-2">
          <Text>폴더명</Text>
          <Input value={name} onChange={onChangeName} />
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
        <Button type="submit" disabled={!name || !color}>
          추가하기
        </Button>
      </form>
    </Modal>
  )
}
