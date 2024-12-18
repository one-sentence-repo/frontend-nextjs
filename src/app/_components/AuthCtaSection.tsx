'use client'

import LinkButton from '@/src/components/shared/LinkButton'
import { XStack, YStack } from '@/src/components/shared/Stack'
import Title from '@/src/components/shared/Title'
import { supabase } from '@/src/lib/supabase/client'
import { routes } from '@/src/routes'
import { meQuery } from '@/src/services/queries/auth/me-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthCtaSection() {
  const router = useRouter()
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))

  useEffect(() => {
    if (me) {
      router.replace('/home')
    }
  }, [me])

  return (
    <XStack className="w-full justify-center">
      <YStack gap={12} className="w-96 p-4">
        <YStack gap={4}>
          <Title>지금 가입하세요.</Title>
          <Title>오늘 당신의 감정을 기록하세요.</Title>
        </YStack>
        <YStack gap={4}>
          <LinkButton href={routes.home}>구경하러 가기</LinkButton>
          <Title size="sm">함께하세요.</Title>
          <LinkButton href={routes.modal.auth.signup} variant="secondary">
            가입하러 가기
          </LinkButton>
        </YStack>
      </YStack>
    </XStack>
  )
}
