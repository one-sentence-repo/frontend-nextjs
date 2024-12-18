'use client'

import { useRouter } from 'next/navigation'
import useResetPassword from '@/src/services/mutates/auth/useResetPassword'
import Button from '@/src/components/shared/Button'
import Modal from '@/src/components/shared/Modal'
import Title from '@/src/components/shared/Title'
import { useSuspenseQuery } from '@tanstack/react-query'
import { meQuery } from '@/src/services/queries/auth/me-query'
import { supabase } from '@/src/lib/supabase/client'
import { useTransition } from 'react'

export default function ResetPasswordConfirmModal() {
  const router = useRouter()
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { mutate: resetPassword } = useResetPassword()
  const [isLoading, startTransition] = useTransition()

  const handleResetPassword = () => {
    resetPassword(me!.email)
  }

  return (
    <Modal>
      <Title>정말 비밀번호를 변경 하시겠습니까?</Title>
      <div className="flex gap-2">
        <Button
          onClick={() => startTransition(() => handleResetPassword())}
          isLoading={isLoading}
          variant="secondary"
        >
          변경이메일 보내기
        </Button>
        <Button onClick={() => router.back()}>취소하기</Button>
      </div>
    </Modal>
  )
}
