import React from 'react'
import MouseEventSection from './_components/MouseEventSection'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { IUserSession, meQuery } from '@/src/services/queries/auth/me-query'
import { createServerClient } from '@/src/lib/supabase/server'
import { todoQuery } from '@/src/services/queries/todo/todo-query'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import DataAccess from './_components/DataAccess'

interface Props {
  params: { todoId: string }
  searchParams: { folder_id: string, color: string, order_from: 'main' | 'folder' }
}

export default async function Page({ params, searchParams }: Props) {
  const todoId = params.todoId
  const folderId = searchParams.folder_id
  const orderFrom = searchParams.order_from
  const color = searchParams.color

  const queryClient = getQueryClient()
  const supabase = createServerClient()
  await queryClient.prefetchQuery(meQuery.getUserSession(supabase))
  const res = queryClient.getQueryData<IUserSession>(['me', 'session'])

  if (res) {
    queryClient.prefetchQuery(
      todoQuery.getTodoFromFolder(supabase, res.userId, Number(folderId)),
    )
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="fixed inset-0 z-40">
        <MouseEventSection todoId={todoId} folderId={folderId}>
          <DataAccess todoId={todoId} folderId={folderId} orderFrom={orderFrom} color={color} />
        </MouseEventSection>
      </div>
    </HydrationBoundary>
  )
}
