import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { createServerClient } from '@/src/lib/supabase/server'
import { postQuery } from '@/src/services/queries/post/post-query'
import { IPostWithUserInfo } from '@/src/types/post'
import PostContainer from './_containers/PostContainer'
import { YStack } from '@/src/components/shared/Stack'

interface Props {
  params: { postId: string }
}

export async function generateMetadata({ params }: Props) {
  const queryClient = getQueryClient()
  const supabase = createServerClient()
  await queryClient.prefetchQuery(
    postQuery.getPost(supabase, Number(params.postId)),
  )
  const post = queryClient.getQueryData<IPostWithUserInfo>([
    'post',
    Number(params.postId),
  ])
  return {
    title: post?.title ?? `${post?.user_info.user_name}님의 글`,
  }
}

export default function PostPage({ params }: Props) {
  const postId = parseInt(params.postId)

  return (
    <YStack gap={8} className="flex-1 animate-fade-in">
      <PostContainer postId={postId} />
    </YStack>
  )
}
