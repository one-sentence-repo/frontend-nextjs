import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { createServerClient } from '@/src/lib/supabase/server'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'

import { todoFolderQuery } from '@/src/services/queries/todo/todo-folder-query'
import { IUserSession, meQuery } from '@/src/services/queries/auth/me-query'

import Title from '@/src/components/shared/Title'
import TodoFoldersSection from '../_components/TodoFoldersSection'

export default async function TodoDashBoard() {
  const supabase = createServerClient()
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(meQuery.getUserSession(supabase))
  const res = queryClient.getQueryData<IUserSession>(['me', 'session'])

  if (res) {
    queryClient.prefetchQuery(
      todoFolderQuery.getTodoFolder(supabase, res.userId),
    )
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="relative flex min-h-[calc(100dvh-80px)] w-full flex-col gap-4 overflow-y-auto p-4">
        <Title>할일 전체</Title>
        <TodoFoldersSection />
      </div>
    </HydrationBoundary>
  )
}
