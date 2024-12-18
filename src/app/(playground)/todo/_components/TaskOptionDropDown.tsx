import Button from '@/src/components/shared/Button'
import Icon from '@/src/components/shared/Icon'
import Text from '@/src/components/shared/Text'
import { routes } from '@/src/routes'
import { useRouter } from 'next/navigation'
import { RefObject } from 'react'

interface Props {
  targetRef: RefObject<HTMLDivElement>
  onTransitionEnd: () => void
  folderId?: number
}

export default function TaskOptionDropDown({
  targetRef,
  onTransitionEnd,
  folderId,
}: Props) {
  const router = useRouter()

  const handleFolderDelete = () => {
    router.push(routes.modal.todo.deleteFolder(folderId))
  }

  const handleFolderEdit = () => {
    router.push(routes.modal.todo.edit(folderId))
  }

  return (
    <div
      ref={targetRef}
      onTransitionEnd={onTransitionEnd}
      data-status="closed"
      className="data-slideDown status-slideDown absolute right-0 top-[calc(100%--4px)] z-30 hidden size-fit origin-top-right rounded-md bg-var-lightgray p-1 shadow-md dark:bg-var-dark"
    >
      <Button
        variant="list"
        onClick={handleFolderDelete}
        className="w-full gap-2 py-2 hover:bg-white dark:hover:bg-var-darkgray"
      >
        <Icon view="0 -960 960 960" size={12}>
          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
        </Icon>
        <Text size="sm">삭제</Text>
      </Button>
      <Button
        variant="list"
        onClick={handleFolderEdit}
        className="w-full gap-2 text-nowrap py-2 hover:bg-white dark:hover:bg-var-darkgray"
      >
        <Icon view="0 -960 960 960" size={12}>
          <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
        </Icon>
        <Text size="sm">수정</Text>
      </Button>
    </div>
  )
}
