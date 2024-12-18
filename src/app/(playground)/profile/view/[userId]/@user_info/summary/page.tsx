import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import AuthHistory from './_components/AuthHistory'
import MyFavoriteWords from './_components/MyFavoriteWords'
import { createServerClient } from '@/src/lib/supabase/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { countPostQuery } from '@/src/services/queries/post/count-post-query'

interface Props {
  params: { userId: string }
}

export default function UserInfoSummary({ params }: Props) {
  const queryClient = getQueryClient()
  const supabase = createServerClient()
  const userId = params.userId

  queryClient.prefetchQuery(countPostQuery.countAllMyPost(supabase, userId))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AuthHistory userId={userId} />
      <MyFavoriteWords userId={userId} />
    </HydrationBoundary>
  )
}
