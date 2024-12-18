import Icon from '@/src/components/shared/Icon'
import useDataDrivenAnimation from '@/src/hooks/useStateChange'
import useOutsideClick from '@/src/hooks/useOutsideClick'
import { MouseEvent } from 'react'
import { DropDown } from '@/src/components/shared/DropDown'
import { useRouter } from 'next/navigation'
import { routes } from '@/src/routes'

interface Props {
  postId?: number
  commentId?: number
  isOwner: boolean
  isSide?: boolean
}

export default function OptionButtonWithDropDown({
  postId,
  commentId,
  isOwner,
  isSide,
}: Props) {
  const router = useRouter()
  const { close, ref, onClick, onTransitionEnd } =
    useDataDrivenAnimation<HTMLDivElement>()
  const optionButtonRef = useOutsideClick<HTMLButtonElement>(close)

  const handleButtonClick = (e: MouseEvent) => {
    e.stopPropagation()
    onClick()
  }

  const pushDeleteModal = (e: MouseEvent) => {
    e.stopPropagation()
    if (commentId && postId) {
      router.push(routes.modal.delete.comment(commentId, postId))
    } else {
      router.push(routes.modal.delete.post(postId!))
    }
  }

  const pushWritePage = (e: MouseEvent) => {
    e.stopPropagation()
    router.push(routes.post.edit(postId!))
  }

  return (
    <DropDown.Root>
      <DropDown.Trigger
        size={isSide ? 'md' : 'icon'}
        targetRef={optionButtonRef}
        onClick={handleButtonClick}
      >
        {isSide ? (
          <Icon view="0 -960 960 960" size={24}>
            <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
          </Icon>
        ) : (
          <Icon view="0 -960 960 960" size={18}>
            <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
          </Icon>
        )}
      </DropDown.Trigger>
      <DropDown.Content
        ref={ref}
        initStatus="closed"
        position={isSide ? 'topRight' : 'topLeft'}
        onTransitionEnd={onTransitionEnd}
        className="p-0"
      >
        {isOwner && (
          <>
            <DropDown.Button
              variant="list"
              size="sm"
              onClick={pushWritePage}
              className="w-full gap-2"
            >
              <Icon view="0 -960 960 960" size={18}>
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
              </Icon>
              수정하기
            </DropDown.Button>
            <DropDown.Button
              variant="list"
              size="sm"
              onClick={pushDeleteModal}
              className="w-full gap-2"
            >
              <Icon view="0 -960 960 960" size={18}>
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
              </Icon>
              삭제하기
            </DropDown.Button>
          </>
        )}
      </DropDown.Content>
    </DropDown.Root>
  )
}
