'use client'

import { MouseEvent, useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { supabase } from '@/src/lib/supabase/client'
import useFollow from '@/src/services/mutates/follow/useFollow'
import useUnFollow from '@/src/services/mutates/follow/useUnFollow'
import { followQuery } from '@/src/services/queries/follow/follow-query'
import useMe from '@/src/hooks/useMe'
import { routes } from '@/src/routes'
import Modal from '@/src/components/shared/Modal'
import { YStack } from '@/src/components/shared/Stack'
import FollowUserCard from '../../_components/FollowUserCard'

interface Props {
  params: { userId: string }
}

export default function FollowerListModal({ params }: Props) {
  const router = useRouter()
  const { me, session } = useMe()
  const { data: followers } = useSuspenseQuery(
    followQuery.getFollower(supabase, params.userId),
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
        {followers?.map((follower) => {
          const isFollowing = myFollows?.find(
            (myFollower: any) =>
              myFollower.followed_user_id === follower.user_info.id,
          )
          const isMe = me?.id === follower.user_info.id
          const isPending = isPendingList[follower.user_info.id] || false

          return (
            <FollowUserCard
              key={follower.id}
              isFollowing={!!isFollowing}
              isMe={isMe}
              follower={follower}
              follow={(e: MouseEvent) =>
                handleFollowUser(e, follower.user_info.id)
              }
              unfollow={(e: MouseEvent) =>
                handleUnfollowUser(e, follower.user_info.id)
              }
              isPending={isPending}
              pushUserPage={() => handlePushUserPage(follower.user_info.id)}
            />
          )
        })}
      </YStack>
    </Modal>
  )
}
