'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import useDeletePost from '@/src/services/mutates/post/useDeletePost'
import { routes } from '@/src/routes'
import { XStack } from '@/src/components/shared/Stack'
import Button from '@/src/components/shared/Button'
import Modal from '@/src/components/shared/Modal'
import Title from '@/src/components/shared/Title'

interface Props {
  params: { postId: string }
}

export default function DeletePostModal({ params }: Props) {
  const router = useRouter()
  const { mutate: deletePost } = useDeletePost()
  const [isLoading, startTransition] = useTransition()

  const handlePostDelete = () => {
    deletePost(Number(params.postId), {
      onSettled: () => router.push(routes.home),
    })
  }

  return (
    <Modal>
      <Title>정말 게시물을 삭제하시겠습니까?</Title>
      <XStack>
        <Button
          variant="secondary"
          disabled={isLoading}
          onClick={() => router.back()}
        >
          취소하기
        </Button>
        <Button
          onClick={() => startTransition(() => handlePostDelete())}
          isLoading={isLoading}
        >
          삭제하기
        </Button>
      </XStack>
    </Modal>
  )
}
