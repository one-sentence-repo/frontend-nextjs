'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'

import { userQuery } from '@/src/services/queries/auth/user-query'
import { followQuery } from '@/src/services/queries/follow/follow-query'

import Avatar from '@/src/components/shared/Avatar'
import Button from '@/src/components/shared/Button'
import Line from '@/src/components/shared/Line'
import Text from '@/src/components/shared/Text'
import Title from '@/src/components/shared/Title'
import useFollow from '@/src/services/mutates/follow/useFollow'
import useUnFollow from '@/src/services/mutates/follow/useUnFollow'
import EmotionAverage from './EmotionAverage'
import { XStack, YStack, ZStack } from '@/src/components/shared/Stack'
import { Container } from '@/src/components/shared/Container'
import { countFollowQuery } from '@/src/services/queries/follow/count-follow-query'
import Follow from '@/src/components/shared/Follow'
import useMe from '@/src/hooks/useMe'
import { routes } from '@/src/routes'
import useFetchWithDelay from '@/src/hooks/useFetchWithDelay'

interface Props {
  userId: string
}

export default function AboutMe({ userId }: Props) {
  const router = useRouter()
  const { me, session } = useMe()
  const { data: user } = useSuspenseQuery(
    userQuery.getUserInfo(supabase, userId),
  )
  const { data: followingCount } = useSuspenseQuery(
    countFollowQuery.countFollowing(supabase, userId),
  )
  const { data: followerCount } = useSuspenseQuery(
    countFollowQuery.countFollower(supabase, userId),
  )
  const { data: followers } = useSuspenseQuery(
    followQuery.getFollower(supabase, userId),
  )
  const { mutate: followUser, isPending: isPendingFollow } = useFollow()
  const { mutate: unfollowUser, isPending: isPendingUnfollow } = useUnFollow()

  const isMyProfilePage = me?.id === user?.id
  const isFollowing =
    !isMyProfilePage &&
    followers?.find((user) => user.follower_user_id === me?.id)
  const isPending = useFetchWithDelay(isPendingFollow || isPendingUnfollow)

  const [isLoadingProfile, startTransitionProfile] = useTransition()
  const [isLoadingWrite, startTransitionWrite] = useTransition()

  const pushFollowerList = () =>
    router.push(routes.modal.follow.follower(userId))

  const pushFollowingList = () =>
    router.push(routes.modal.follow.following(userId))

  const handlePushEditProfilePage = () =>
    startTransitionProfile(() => router.push(routes.profile.edit))

  const handlePushNewPostPage = () =>
    startTransitionWrite(() => router.push(routes.post.new))

  const handleFollowButtonClick = () => {
    session
      ? isFollowing
        ? unfollowUser({
            followed_user_id: userId,
            follower_user_id: me!.id,
          })
        : followUser({ followed_user_id: userId, follower_user_id: me!.id })
      : router.push(routes.modal.auth.guard)
  }

  const handleSendMessageButtonClick = () => {
    return
  }

  return (
    <Container className="rounded-md bg-white p-8 shadow-sm transition max-lg:py-4 dark:bg-var-darkgray">
      <YStack gap={4} className="items-center justify-center">
        <ZStack className="relative">
          <Avatar src={user?.avatar_url} size="md" ring shadow="sm" />
          <EmotionAverage userId={userId} />
        </ZStack>
        <YStack gap={4} className="w-full items-center">
          <YStack className="items-center sm:flex-row sm:items-end">
            <Title>{user?.user_name}</Title>
            <Text as="span" type="caption" size="sm">
              {user?.email}
            </Text>
          </YStack>
          <Line className="w-full" />
          <ZStack direction="col" gap={4}>
            <Text>
              {user?.about_me ? user.about_me : '자기 소개를 작성해주세요.'}
            </Text>
          </ZStack>
          <Follow>
            <Follow.Follower
              followerCount={followerCount}
              onClick={pushFollowerList}
            />
            <Follow.Following
              followingCount={followingCount}
              onClick={pushFollowingList}
            />
          </Follow>
          <XStack gap={4}>
            {isMyProfilePage ? (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  isLoading={isLoadingProfile}
                  onClick={handlePushEditProfilePage}
                  className="text-nowrap"
                >
                  프로필 수정
                </Button>
                <Button
                  size="sm"
                  isLoading={isLoadingWrite}
                  onClick={handlePushNewPostPage}
                >
                  글쓰기
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  isLoading={isPending}
                  onClick={handleFollowButtonClick}
                >
                  {isFollowing ? '팔로우 취소' : '팔로우 하기'}
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleSendMessageButtonClick}
                >
                  메시지 보내기
                </Button>
              </>
            )}
          </XStack>
        </YStack>
      </YStack>
    </Container>
  )
}
