'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { colorTheme, useTheme } from '@/src/store/useTheme'
import { userQuery } from '@/src/services/queries/auth/user-query'
import { getSignUpDays } from '@/src/utils/formatDate'
import { emotionQuery } from '@/src/services/queries/emotion/emotion-query'
import HistoryBlock from './HistoryBlock'
import { XStack } from '@/src/components/shared/Stack'
import { countPostQuery } from '@/src/services/queries/post/count-post-query'
import { Container } from '@/src/components/shared/Container'

interface Props {
  userId: string
}

export default function AuthHistory({ userId }: Props) {
  const { color } = useTheme()
  const { data: user } = useSuspenseQuery(
    userQuery.getUserInfo(supabase, userId),
  )
  const { data: postLength } = useSuspenseQuery(
    countPostQuery.countAllMyPost(supabase, userId),
  )
  const { data: myAverageEmotion } = useSuspenseQuery(
    emotionQuery.getEmotionAverage(supabase, userId),
  )

  return (
    <Container className="animate-fade-in">
      <XStack className="sm:gap-8">
        <HistoryBlock
          title="시작한지"
          content={getSignUpDays(user?.created_at)}
          unit="일 째"
        />
        <HistoryBlock title="기록" content={postLength} unit="개" />
        <HistoryBlock
          title="평균 감정 농도"
          content={myAverageEmotion}
          className={colorTheme({ color })}
          unit="%"
        />
      </XStack>
    </Container>
  )
}
