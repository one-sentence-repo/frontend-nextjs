'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'
import { routes } from '@/src/routes'
import { useInput } from '@/src/hooks/useInput'
import { supabase } from '@/src/lib/supabase/client'
import useReport from '@/src/services/mutates/report/useReport'
import { meQuery } from '@/src/services/queries/auth/me-query'
import Button from '@/src/components/shared/Button'
import Modal from '@/src/components/shared/Modal'
import { XStack, YStack } from '@/src/components/shared/Stack'
import TextArea from '@/src/components/shared/TextArea'
import Title from '@/src/components/shared/Title'

interface Props {
  params: { postId: string }
}

export default function ReportPostModal({ params }: Props) {
  const router = useRouter()
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const [reason, onChangeReasonValue] = useInput('')
  const { mutate: report } = useReport()
  const [isLoading, startTransition] = useTransition()

  const handlePostReport = () => {
    report(
      {
        reason,
        reporterId: me?.userId,
        targetPostId: Number(params.postId),
      },
      {
        onSuccess: () => {
          router.push(routes.modal.success, { scroll: false })
          router.back()
        },
      },
    )
  }

  return (
    <Modal>
      <Title>게시물 신고</Title>
      <YStack className="w-full">
        <Title size="xs">신고 사유</Title>
        <TextArea value={reason} onChange={onChangeReasonValue} />
      </YStack>
      <XStack gap={4} className="w-full">
        <Button
          variant="secondary"
          onClick={() => router.back()}
          className="flex-1"
        >
          취소하기
        </Button>
        <Button
          onClick={() => startTransition(() => handlePostReport())}
          isLoading={isLoading}
          className="flex-1"
        >
          신고하기
        </Button>
      </XStack>
    </Modal>
  )
}
