import { useTransition } from 'react'
import useFollow from '@/src/services/mutates/follow/useFollow'
import useUnFollow from '@/src/services/mutates/follow/useUnFollow'
import useDataDrivenAnimation from '@/src/hooks/useStateChange'
import useOutsideClick from '@/src/hooks/useOutsideClick'
import { DropDown } from '@/src/components/shared/DropDown'
import Title from '@/src/components/shared/Title'
import Avatar from '@/src/components/shared/Avatar'
import { useSuspenseQuery } from '@tanstack/react-query'
import { meQuery } from '@/src/services/queries/auth/me-query'
import { supabase } from '@/src/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { XStack, YStack } from '@/src/components/shared/Stack'
import Follow from '@/src/components/shared/Follow'
import { routes } from '@/src/routes'

interface Props {
  avatarUrl: string | null
  isMe: boolean
  isFollowing: boolean
  followerCount: number | null
  followingCount: number | null
  userId: string
  userName: string | null
}

export default function AvatarButtonWithDropDown({
  avatarUrl,
  isMe,
  isFollowing,
  followerCount,
  followingCount,
  userId,
  userName,
}: Props) {
  const router = useRouter()
  const { close, ref, onClick, onTransitionEnd } =
    useDataDrivenAnimation<HTMLDivElement>()
  const buttonRef = useOutsideClick<HTMLButtonElement>(close)
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { mutate: follow } = useFollow()
  const { mutate: unfollow } = useUnFollow()
  const [isLoadingFollowing, startTransitionFollowing] = useTransition()

  const pushFollowerList = () =>
    router.push(routes.modal.follow.follower(userId))
  const pushFollowingList = () =>
    router.push(routes.modal.follow.following(userId))

  const handleFollowButtonClick = () => {
    me
      ? isFollowing
        ? unfollow({ followed_user_id: userId, follower_user_id: me.userId! })
        : follow({ followed_user_id: userId, follower_user_id: me.userId! })
      : router.push(routes.modal.auth.guard)
  }

  return (
    <DropDown.Root>
      <DropDown.Trigger
        targetRef={buttonRef}
        variant="none"
        onClick={onClick}
        className="p-0"
      >
        <Avatar src={avatarUrl} size="sm" shadow="sm" />
      </DropDown.Trigger>
      <DropDown.Content
        ref={ref}
        initStatus="closed"
        position="bottomRight"
        onTransitionEnd={onTransitionEnd}
        className="right-0 top-0"
      >
        <YStack gap={4} className="p-4">
          <YStack gap={4} className="items-center">
            <Avatar src={avatarUrl} size="sm" />
            <Title type="sub" size="sm">
              {userName}
            </Title>
          </YStack>
          <YStack gap={4} className="items-center">
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
              {isMe ? (
                <>
                  <DropDown.LinkButton
                    href={routes.profile.edit}
                    variant="secondary"
                  >
                    프로필 수정
                  </DropDown.LinkButton>
                  <DropDown.LinkButton href={routes.profile.view(userId)}>
                    마이 페이지
                  </DropDown.LinkButton>
                </>
              ) : (
                <>
                  <DropDown.Button
                    variant="secondary"
                    isLoading={isLoadingFollowing}
                    onClick={() =>
                      startTransitionFollowing(() => handleFollowButtonClick())
                    }
                  >
                    {isFollowing ? '팔로우 취소' : '팔로우 하기'}
                  </DropDown.Button>
                  <DropDown.LinkButton href={routes.profile.view(userId)}>
                    프로필 페이지
                  </DropDown.LinkButton>
                </>
              )}
            </XStack>
          </YStack>
        </YStack>
      </DropDown.Content>
    </DropDown.Root>
  )
}
