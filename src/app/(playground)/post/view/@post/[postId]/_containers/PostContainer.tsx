'use client'

import Link from 'next/link'
import { MouseEvent, Suspense, useState } from 'react'
import { EditorContent } from '@tiptap/react'
import { useRouter } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'

import { postQuery } from '@/src/services/queries/post/post-query'
import useFollow from '@/src/services/mutates/follow/useFollow'
import useUnFollow from '@/src/services/mutates/follow/useUnFollow'
import { followQuery } from '@/src/services/queries/follow/follow-query'
import { countFollowQuery } from '@/src/services/queries/follow/count-follow-query'
import useLikePost from '@/src/services/mutates/post/useLikePost'
import useUnlikePost from '@/src/services/mutates/post/useUnlikePost'
import useBlockEditor from '@/src/hooks/useBlockEditor'
import useMe from '@/src/hooks/useMe'
import useFetchWithDelay from '@/src/hooks/useFetchWithDelay'
import useTransitionWithRoute from '@/src/hooks/useTransitionWithRoute'
import { formatDateToHM, formatDateToMDY } from '@/src/utils/formatDate'
import { TEmotion } from '@/src/app/(playground)/post/edit/page'
import { routes } from '@/src/routes'

import Avatar from '@/src/components/shared/Avatar'
import Text from '@/src/components/shared/Text'
import Title from '@/src/components/shared/Title'
import Line from '@/src/components/shared/Line'
import Tag from '@/src/components/shared/Tag'
import Spinner from '@/src/components/shared/Spinner'
import Button from '@/src/components/shared/Button'
import { XStack, YStack } from '@/src/components/shared/Stack'

import EmotionGauge from '@/src/app/(playground)/(home)/_components/EmotionGauge'
import LikeButton from '@/src/app/(playground)/(home)/_components/LikeButton'
import CommentButton from '@/src/app/(playground)/(home)/_components/CommentButton'
import AccessTypeButtonWithDropDown from '@/src/app/(playground)/(home)/_components/AccessTypeButtonWithDropDown'
import OptionButtonWithDropDown from '@/src/app/(playground)/(home)/_components/OptionButtonWithDropDown'
import Comments from '@/src/app/(playground)/(home)/_components/Comments'
import ReportButton from '@/src/app/(playground)/(home)/_components/ReportButton'
import AvatarButtonWithDropDown from '@/src/app/(playground)/(home)/_components/AvatarButtonWithDropDown'
import ShareButton from '@/src/app/(playground)/(home)/_components/ShareButton'

interface Props {
  postId: number
}

export default function PostContainer({ postId }: Props) {
  const router = useRouter()
  const [showComment, setShowComment] = useState(true)
  const { data: post } = useSuspenseQuery(postQuery.getPost(supabase, postId))
  const { me } = useMe()
  const { data: isLiked } = useSuspenseQuery(
    postQuery.checkLiked(supabase, postId, me?.id),
  )
  const { data: followerCount } = useSuspenseQuery(
    countFollowQuery.countFollower(supabase, post?.user_id),
  )
  const { data: followingCount } = useSuspenseQuery(
    countFollowQuery.countFollowing(supabase, post?.user_id),
  )
  const { data: followers } = useSuspenseQuery(
    followQuery.getFollower(supabase, post?.user_id),
  )
  const isFollowing = followers?.find(
    (user) => user.follower_user_id === me?.id,
  )
  const isMe = me?.id === post?.user_id
  const { mutate: follow, isPending: isPendingFollow } = useFollow()
  const { mutate: unfollow, isPending: isPendingUnfollow } = useUnFollow()
  const { editor } = useBlockEditor({ content: post?.content })
  const { mutate: like } = useLikePost()
  const { mutate: unlike } = useUnlikePost()
  const isPending = useFetchWithDelay(isPendingFollow || isPendingUnfollow)
  const isOwner = me?.id === post?.user_id
  const [isLoadingWrite, startTransitionWrite] = useTransitionWithRoute()
  const [isLoadingEditProfile, startTransitionEditProfile] =
    useTransitionWithRoute()

  const handleShowComment = () => {
    setShowComment((prev) => !prev)
  }

  const handleLike = () => {
    isLiked
      ? unlike({ meId: me?.id, postId })
      : like({
          meId: me?.id,
          postId: postId,
        })
  }

  const handleLikePost = (e: MouseEvent) => {
    e.stopPropagation()
    me ? handleLike() : router.push(routes.modal.auth.guard, { scroll: false })
  }

  const handleFollow = () => {
    me
      ? isFollowing
        ? unfollow({
            followed_user_id: post.user_id,
            follower_user_id: me.id,
          })
        : follow({
            followed_user_id: post.user_id,
            follower_user_id: me.id,
          })
      : router.push(routes.modal.auth.guard, { scroll: false })
  }

  if (!editor) {
    return null
  }

  if (!post) {
    return null
  }

  return (
    <YStack gap={8}>
      <YStack className="rounded-md bg-white p-2 shadow-sm sm:gap-4 sm:p-4 dark:bg-var-darkgray">
        <XStack gap={4} className="items-center">
          <AvatarButtonWithDropDown
            isMe={isMe}
            userId={post?.user_id}
            userName={post?.user_info.user_name}
            avatarUrl={post?.user_info.avatar_url}
            followerCount={followerCount}
            followingCount={followingCount}
            isFollowing={isFollowing}
            position="bottomRight"
          />
          <YStack gap={0} className="self-end">
            <XStack gap={1} className="items-end">
              <Title size="xs" type="sub">
                {post?.user_info.user_name}
              </Title>
              <Text as="span" type="caption" size="sm">
                · @{post?.user_info.email?.split('@')[0]}
              </Text>
            </XStack>
            <Text type="caption" size="sm">
              {formatDateToMDY(post.created_at)} ·{' '}
              {formatDateToHM(post.created_at)}
            </Text>
          </YStack>
          <XStack className="h-full flex-1 items-end justify-end p-2">
            <EmotionGauge
              emotionLevel={post?.emotion_level as TEmotion}
              className="h-full"
            />
          </XStack>
        </XStack>
        <Line />
        <YStack gap={8} className='my-8'>
          {post.title && (
            <Title size="lg" className="my-4">
              {post.title}
            </Title>
          )}
          <EditorContent editor={editor} />
          {post?.tags && post.tags.length >= 1 && (
            <XStack className="flex-wrap">
              {post?.tags?.map((tag, index) => <Tag key={index} tag={tag} />)}
            </XStack>
          )}
        </YStack>
        <YStack>
          <YStack
            gap={4}
            className="w-full rounded-md bg-var-lightgray p-4 transition duration-300 hover:shadow-lg sm:flex-row dark:bg-var-dark"
          >
            <Link
              href={routes.profile.view(post?.user_id)}
              className="flex flex-1 gap-4"
            >
              <Avatar src={post?.user_info.avatar_url} size="md" />
              <YStack gap={1} className="w-full">
                <Title size="sm">{post?.user_info.user_name}</Title>
                <Text type="caption">{post?.user_info.email}</Text>
                <Text>{post?.user_info.about_me}</Text>
              </YStack>
            </Link>
            <XStack
              onClick={(e) => e.stopPropagation()}
              className="justify-center sm:flex-col"
            >
              {me?.id === post?.user_id ? (
                <>
                  <Button
                    size="sm"
                    isLoading={isLoadingWrite}
                    onClick={() => startTransitionWrite(routes.post.new)}
                    className="w-full self-end"
                  >
                    글 쓰기
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      startTransitionEditProfile(routes.profile.edit)
                    }
                    isLoading={isLoadingEditProfile}
                    className="w-full self-end"
                  >
                    프로필 수정
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="sm"
                    isLoading={isPending}
                    onClick={handleFollow}
                    className="w-full self-end"
                  >
                    {isFollowing ? '팔로우 취소' : '팔로우 하기'}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full self-end"
                  >
                    메세지 보내기
                  </Button>
                </>
              )}
            </XStack>
          </YStack>
        </YStack>
        <YStack className="sm:hidden">
          <Line />
          <XStack gap={0} className="items-center justify-between">
            <LikeButton
              isLiked={isLiked}
              likedCount={post?.like[0].count}
              onLike={handleLikePost}
              meId={me?.id}
              viewToolTip
            />
            <CommentButton
              viewToolTip
              showComment={showComment}
              onShowComment={handleShowComment}
              commentCount={post.comment}
            />
            <AccessTypeButtonWithDropDown
              accessType={post?.access_type}
              viewToolTip
            />
            <ShareButton viewToolTip />
            <ReportButton viewToolTip postId={postId} />
            {isOwner && (
              <OptionButtonWithDropDown isOwner={isOwner} postId={post.id} />
            )}
          </XStack>
        </YStack>
      </YStack>

      {showComment && (
        <YStack
          gap={4}
          className="rounded-md bg-white p-4 shadow-sm dark:bg-var-darkgray"
        >
          <Suspense
            fallback={
              <Spinner.Container>
                <Spinner size={40} />
              </Spinner.Container>
            }
          >
            <Comments postId={post.id} me={me} />
          </Suspense>
        </YStack>
        /**
         * TODO #1 무한 대댓글이 가능함 @kidboi666
         */
      )}
    </YStack>
  )
}
