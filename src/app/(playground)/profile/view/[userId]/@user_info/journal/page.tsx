'use client'

import { useInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { supabase } from '@/src/lib/supabase/client'
import { userQuery } from '@/src/services/queries/auth/user-query'
import { postQuery } from '@/src/services/queries/post/post-query'
import useIntersect from '@/src/hooks/useIntersect'
import { Container } from '@/src/components/shared/Container'
import Spinner from '@/src/components/shared/Spinner'
import { YStack } from '@/src/components/shared/Stack'
import Empty from '@/src/components/shared/Empty'
import useMe from '@/src/hooks/useMe'
import { IPostWithUserInfo } from '@/src/types/post'
import PostCard from '@/src/app/(playground)/(home)/_components/PostCard'

interface Props {
  params: { userId: string }
}

export default function Journals({ params }: Props) {
  const limit = 4
  const { me, session } = useMe()
  const { data: user } = useSuspenseQuery(
    userQuery.getUserInfo(supabase, params.userId),
  )
  const { data, fetchNextPage, hasNextPage, isFetching, isPending, isLoading } =
    useInfiniteQuery(
      postQuery.getAllUserPost(
        supabase,
        params.userId,
        'journal',
        limit,
        me?.id,
      ),
    )
  const journals = data?.pages.flatMap((journal) => journal || [])
  const [ref, inView] = useIntersect<HTMLDivElement>({}, !!isLoading)
  const postUserInfo = {
    email: user?.email,
    user_name: user?.user_name,
    avatar_url: user?.avatar_url,
  }

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
      {journals?.length! > 0 ? (
        <YStack gap={8}>
          {journals?.map((journal: IPostWithUserInfo) =>
            journal?.content ? (
              <PostCard
                key={journal?.id}
                meId={session ? me?.id : null}
                post={journal}
                session={session}
                postUserInfo={postUserInfo}
              />
            ) : (
              <Empty key={journal?.id}>
                <Empty.Icon view="0 -960 960 960" size={20}>
                  <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
                </Empty.Icon>
                <Empty.Text>비공개된 게시물 입니다.</Empty.Text>
              </Empty>
            ),
          )}
          {isFetching && (
            <Spinner.Container>
              <Spinner size={60} />
            </Spinner.Container>
          )}
        </YStack>
      ) : (
        <Empty>
          <Empty.Text>아직 작성한 일기가 없습니다.</Empty.Text>
        </Empty>
      )}
      <div ref={ref} />
    </Container>
  )
}
