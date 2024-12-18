'use client'

import Button from '@/src/components/shared/Button'
import { YStack } from '@/src/components/shared/Stack'
import Title from '@/src/components/shared/Title'
import useMe from '@/src/hooks/useMe'
import useSignOut from '@/src/services/mutates/auth/useSignOut'

export default function LogoutButton() {
  const { session } = useMe()
  const { mutate: signOut } = useSignOut()

  const handleSingOut = () => {
    signOut()
  }

  return (
    <YStack>
      <Title>로그아웃</Title>
      <Button
        size="sm"
        onClick={handleSingOut}
        disabled={!session}
        className="w-fit"
      >
        로그아웃 하기
      </Button>
    </YStack>
  )
}
