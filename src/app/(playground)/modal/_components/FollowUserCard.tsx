import Avatar from '@/src/components/shared/Avatar'
import Button from '@/src/components/shared/Button'
import { Container } from '@/src/components/shared/Container'
import { XStack, YStack } from '@/src/components/shared/Stack'
import Text from '@/src/components/shared/Text'
import useFetchWithDelay from '@/src/hooks/useFetchWithDelay'

interface Props {
  follower: any
  follow: any
  unfollow: any
  isFollowing: boolean
  isMe: boolean
  pushUserPage: () => void
  isPending: boolean
}
/**
 * TODO #7 추후 타입핑 요망 @kidboi666
 */

export default function FollowUserCard({
  follower,
  follow,
  unfollow,
  isFollowing,
  isMe,
  pushUserPage,
  isPending,
}: Props) {
  const isPendingFollow = useFetchWithDelay(isPending)
  if (isMe)
    return (
      <Container
        onClick={pushUserPage}
        className="w-full cursor-pointer rounded-md p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700"
      >
        <XStack gap={4} key={follower.id} className="items-center">
          <Avatar
            size="base"
            src={follower.user_info.avatar_url}
            className="size-8"
          />
          <YStack gap={0} className="flex-1 justify-center">
            <Text>{follower.user_info.user_name}</Text>
            <Text type="caption" size="sm">
              @{follower.user_info.email.split('@')[0]}
            </Text>
          </YStack>
        </XStack>
      </Container>
    )

  return (
    <Container
      onClick={pushUserPage}
      className="w-full cursor-pointer rounded-md p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700"
    >
      <XStack gap={4} key={follower.id} className="items-center">
        <Avatar
          size="base"
          src={follower.user_info.avatar_url}
          className="size-8"
        />
        <YStack gap={0} className="flex-1 justify-center">
          <Text>{follower.user_info.user_name}</Text>
          <Text type="caption" size="sm">
            @{follower.user_info.email.split('@')[0]}
          </Text>
        </YStack>
        {isFollowing ? (
          <Button
            variant="secondary"
            size="sm"
            isLoading={isPendingFollow}
            onClick={unfollow}
          >
            팔로우 취소
          </Button>
        ) : (
          <Button
            size="sm"
            isLoading={isPendingFollow}
            className="h-fit"
            onClick={follow}
          >
            팔로우 하기
          </Button>
        )}
      </XStack>
    </Container>
  )
}
