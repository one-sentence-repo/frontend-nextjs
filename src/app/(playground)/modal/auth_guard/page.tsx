'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Title from '@/src/components/shared/Title'
import Button from '@/src/components/shared/Button'
import Modal from '@/src/components/shared/Modal'
import { XStack } from '@/src/components/shared/Stack'

export default function AuthGuardModal() {
  const router = useRouter()

  const pushSignIn = () => {
    router.replace('/modal/signin')
  }

  const handleEnterPush = (e: KeyboardEvent) => {
    const ReactEvent = e as never as React.KeyboardEvent
    if (ReactEvent?.key === 'Enter') {
      pushSignIn()
    }
  }

  const pushBack = () => {
    router.back()
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEnterPush)

    return () => {
      document.removeEventListener('keydown', handleEnterPush)
    }
  }, [])

  return (
    <Modal>
      <Title>로그인이 필요합니다.</Title>
      <XStack className="w-full">
        <Button onClick={pushSignIn} className="w-full">
          로그인 하러가기
        </Button>
        <Button variant="secondary" onClick={pushBack} className="w-full">
          취소
        </Button>
      </XStack>
    </Modal>
  )
}
