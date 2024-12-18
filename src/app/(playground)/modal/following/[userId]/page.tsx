'use client'

import Modal from '@/src/components/shared/Modal'
import { YStack } from '@/src/components/shared/Stack'
import { supabase } from '@/src/lib/supabase/client'
import useFollow from '@/src/services/mutates/follow/useFollow'
import useUnFollow from '@/src/services/mutates/follow/useUnFollow'
import { followQuery } from '@/src/services/queries/follow/follow-query'
import { useSuspenseQuery } from '@tanstack/react-query'
import FollowUserCard from '../../_components/FollowUserCard'
import { useRouter } from 'next/navigation'
import useMe from '@/src/hooks/useMe'
import { routes } from '@/src/routes'
import { useState } from 'react'

interface Props {
  params: { userId: string }
}

export default function FollowingListModal({ params }: Props) {
  const router = useRouter()
  const { me, session } = useMe()
  const { data: followings } = useSuspenseQuery(
    followQuery.getFollowing(supabase, params.userId),
  )
  const { data: myFollows } = useSuspenseQuery(
    followQuery.getFollowing(supabase, me?.id),
  )
  const { mutate: followUser } = useFollow()
  const { mutate: unfollowUser } = useUnFollow()
  const [isPendingList, setPendingList] = useState<Record<string, boolean>>({})

  const handleFollowUser = (e: MouseEvent, userId: string) => {
    e.stopPropagation()
    if (!session) return router.push(routes.modal.auth.guard)

    setPendingList((prev) => ({ ...prev, [userId]: true }))
    followUser(
      {
        followed_user_id: userId,
        follower_user_id: me!.id,
      },
      {
        onSettled: () => {
          setPendingList((prev) => ({ ...prev, [userId]: false }))
        },
      },
    )
  }

  const handleUnfollowUser = (e: MouseEvent, userId: string) => {
    e.stopPropagation()
    if (!session) return router.push(routes.modal.auth.guard)

    setPendingList((prev) => ({ ...prev, [userId]: true }))
    unfollowUser(
      {
        followed_user_id: userId,
        follower_user_id: me!.id,
      },
      {
        onSettled: () => {
          setPendingList((prev) => ({ ...prev, [userId]: false }))
        },
      },
    )
  }

  const handlePushUserPage = (userId: string) => {
    router.push(routes.profile.view(userId), { scroll: false })
  }

  return (
    <Modal>
      <YStack className="w-full">
        {followings?.map((user) => {
          const isFollowing = myFollows?.find(
            (myFollower: any) =>
              myFollower.followed_user_id === user.user_info.id,
          )
          const isMe = me?.id === user.followed_user_id
          const isPending = isPendingList[user.user_info.id] || false

          return (
            <FollowUserCard
              key={user.id}
              isFollowing={!!isFollowing}
              isMe={isMe}
              follower={user}
              follow={(e: MouseEvent) => handleFollowUser(e, user.user_info.id)}
              unfollow={(e: MouseEvent) =>
                handleUnfollowUser(e, user.user_info.id)
              }
              pushUserPage={() => handlePushUserPage(user.user_info.id)}
              isPending={isPending}
            />
          )
        })}
      </YStack>
    </Modal>
  )
}
