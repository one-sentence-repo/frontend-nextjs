'use client'

import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { postQuery } from '@/src/services/queries/post/post-query'
import PostCard from '../_components/PostCard'
import useIntersect from '@/src/hooks/useIntersect'
import { useEffect } from 'react'
import Spinner from '@/src/components/shared/Spinner'
import { YStack } from '@/src/components/shared/Stack'
import useMe from '@/src/hooks/useMe'

export default function PostContainer() {
  const limit = 4
  const { me, session } = useMe()
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useSuspenseInfiniteQuery(postQuery.getAllPost(supabase, limit))
  const posts = data.pages.flatMap((page) => page || [])
  const [target, inView] = useIntersect<HTMLDivElement>()

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  return (
    <YStack gap={12}>
      {posts?.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          postUserInfo={post.user_info}
          session={session}
          meId={session ? me?.id : null}
        />
      ))}
      <div ref={target} />
      {isFetching && (
        <Spinner.Container>
          <Spinner size={60} />
        </Spinner.Container>
      )}
    </YStack>
  )
}
