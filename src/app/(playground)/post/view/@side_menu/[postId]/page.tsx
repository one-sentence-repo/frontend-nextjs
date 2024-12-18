'use client'

import { MouseEvent } from 'react'
import { supabase } from '@/src/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

import { postQuery } from '@/src/services/queries/post/post-query'
import { meQuery } from '@/src/services/queries/auth/me-query'

import { Container } from '@/src/components/shared/Container'
import { YStack } from '@/src/components/shared/Stack'
import Line from '@/src/components/shared/Line'
import useLikePost from '@/src/services/mutates/post/useLikePost'
import useUnlikePost from '@/src/services/mutates/post/useUnlikePost'
import { routes } from '@/src/routes'
import LikeButton from '@/src/app/(playground)/(home)/_components/LikeButton'
import CommentButton from '@/src/app/(playground)/(home)/_components/CommentButton'
import AccessTypeButtonWithDropDown from '@/src/app/(playground)/(home)/_components/AccessTypeButtonWithDropDown'
import ShareButton from '@/src/app/(playground)/(home)/_components/ShareButton'
import ReportButton from '@/src/app/(playground)/(home)/_components/ReportButton'
import OptionButtonWithDropDown from '@/src/app/(playground)/(home)/_components/OptionButtonWithDropDown'
import { countCommentQuery } from '@/src/services/queries/comment/count-comment-query'

interface Props {
  params: { postId: string }
}

export default function SideMenuPage({ params }: Props) {
  const postId = Number(params.postId)
  const router = useRouter()
  const { data: post } = useSuspenseQuery(
    postQuery.getPost(supabase, Number(params.postId)),
  )
  const { data: commentCount } = useSuspenseQuery(
    countCommentQuery.countCommentFromPost(supabase, postId),
  )
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: isLiked } = useQuery(
    postQuery.checkLiked(supabase, postId, me?.userId),
  )
  const { mutate: like } = useLikePost()
  const { mutate: unlike } = useUnlikePost()
  const isOwner = me?.userId === post?.user_id

  const handleFavorite = () => {
    isLiked
      ? unlike({ meId: me?.userId, postId })
      : like({
          meId: me?.userId,
          postId: postId,
        })
  }

  const handleFavoritePost = (e: MouseEvent) => {
    e.stopPropagation()
    me
      ? handleFavorite()
      : router.push(routes.modal.auth.guard, { scroll: false })
  }

  return (
    <Container className="sticky left-4 top-8 hidden h-fit animate-fade-in-reverse rounded-md bg-white p-2 shadow-md max-lg:fixed sm:flex dark:bg-var-darkgray">
      <YStack as="nav" className="items-center">
        <LikeButton
          likedCount={post?.like[0].count}
          isLiked={isLiked}
          onLike={handleFavoritePost}
          meId={me?.userId}
          viewToolTip
          isSide
        />
        <CommentButton
          commentCount={commentCount}
          showComment={!!post?.comment}
          viewToolTip
          isSide
        />
        <Line className="w-full" />
        <AccessTypeButtonWithDropDown
          accessType={post?.access_type}
          viewToolTip
          isSide
        />
        <ShareButton isSide viewToolTip />
        <ReportButton postId={post.id} viewToolTip isSide />
        {isOwner && (
          <OptionButtonWithDropDown
            isOwner={isOwner}
            postId={post?.id}
            isSide
          />
        )}
      </YStack>
    </Container>
  )
}
