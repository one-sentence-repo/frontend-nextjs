'use client'

import Button from '@/src/components/shared/Button'
import { YStack } from '@/src/components/shared/Stack'
import Text from '@/src/components/shared/Text'
import Title from '@/src/components/shared/Title'
import { routes } from '@/src/routes'
import useMe from '@/src/hooks/useMe'
import { useRouter } from 'next/navigation'

export default function PasswordResetForm() {
  const router = useRouter()
  const { me, session } = useMe()
  const handlePasswordReset = () => {
    router.push(routes.modal.updatePassword)
  }

  return (
    <YStack>
      {session ? (
        <>
          <Title>비밀번호 변경</Title>
          <Text>
            이메일 :{' '}
            <Text as="span" className="text-gray-400">
              {me?.email}
            </Text>
          </Text>
          <Button onClick={handlePasswordReset} size="sm" className="w-fit">
            현재 이메일로 비밀번호 변경 이메일 보내기
          </Button>
        </>
      ) : (
        <>
          <Title>비밀번호 변경</Title>
          <Button disabled size="sm" className="w-fit">
            현재 이메일로 비밀번호 변경 이메일 보내기
          </Button>
        </>
      )}
    </YStack>
  )
}
