'use client'

import { useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'

import { postQuery } from '@/src/services/queries/post/post-query'
import useIntersect from '@/src/hooks/useIntersect'
import useMe from '@/src/hooks/useMe'

import { Container } from '@/src/components/shared/Container'
import Empty from '@/src/components/shared/Empty'
import Spinner from '@/src/components/shared/Spinner'
import { YStack } from '@/src/components/shared/Stack'
import PostCard from '@/src/app/(playground)/(home)/_components/PostCard'

interface Props {
  params: { userId: string }
}

export default function LikedPage({ params }: Props) {
  const limit = 4
  const { me, session } = useMe()
  const { data, hasNextPage, fetchNextPage, isFetching, isLoading, isPending } =
    useInfiniteQuery(
      postQuery.getLikedPost(supabase, params.userId, limit, me?.id),
    )
  const likedPosts = data?.pages.flatMap((post) => post || [])
  const [ref, inView] = useIntersect<HTMLDivElement>({}, !!isLoading)

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  if (isPending) {
    return (
      <Spinner.Container>
        <Spinner size={60} />
      </Spinner.Container>
    )
  }

  return (
    <Container className="animate-fade-in">
      {likedPosts && likedPosts?.length > 0 ? (
        <YStack gap={8}>
          {likedPosts?.map((item) =>
            item?.post.content ? (
              <PostCard
                key={item.id}
                meId={me?.id}
                session={session}
                post={item.post}
                createdAtLiked={item.created_at}
                postUserInfo={item.post.user_info}
              />
            ) : (
              <Empty key={item?.id}>
                <Empty.Icon view="0 -960 960 960" size={20}>
                  <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
                </Empty.Icon>
                <Empty.Text>비공개된 게시물 입니다.</Empty.Text>
              </Empty>
            ),
          )}
          <div ref={ref} />
          {isFetching && (
            <Spinner.Container>
              <Spinner size={60} />
            </Spinner.Container>
          )}
        </YStack>
      ) : (
        <Empty>
          <Empty.Text>좋아요 한 게시글이 없습니다.</Empty.Text>
        </Empty>
      )}
    </Container>
  )
}
