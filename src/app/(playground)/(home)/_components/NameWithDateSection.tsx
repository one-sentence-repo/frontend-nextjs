import { YStack } from '@/src/components/shared/Stack'
import Text from '@/src/components/shared/Text'
import Title from '@/src/components/shared/Title'
import { formatDateElapsed } from '@/src/utils/formatDate'

interface Props {
  userName: string | null
  email: string | null
  createdAt: string
  createdAtLiked?: string
  postType: 'journal' | 'article'
}

export default function NameWithDateSection({
  userName,
  email,
  createdAt,
  createdAtLiked,
  postType,
}: Props) {
  return (
    <YStack gap={0} className="flex-1 justify-between">
      <Title size="xs" type="sub" className="line-clamp-1">
        {userName}
      </Title>
      <Text type="caption" size="sm">
        @{email?.split('@')[0]} · {formatDateElapsed(createdAt)} ·{' '}
        {postType === 'journal' ? '감정 일기' : '아티클'}
        {createdAtLiked && ' ·  업데이트 '}
        {createdAtLiked && formatDateElapsed(createdAtLiked)}
      </Text>
    </YStack>
  )
}
