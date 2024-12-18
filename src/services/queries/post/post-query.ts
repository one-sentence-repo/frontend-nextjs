import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'
import { SupabaseClient } from '@supabase/supabase-js'
import { Tables } from '@/src/types/supabase'
import { queryKey } from '@/src/lib/tanstack/query-key'
import { IPostWithUserInfo } from '@/src/types/post'

export const postQuery = {
  getAllPost: (supabase: SupabaseClient, limit: number) =>
    infiniteQueryOptions({
      queryKey: queryKey.post.public,
      queryFn: async ({ pageParam = 0 }) => {
        const { data } = await supabase
          .from('post')
          .select(
            `
            *,
            like(count),
            user_info(
              email,
              user_name,
              avatar_url
            )
            `,
          )
          .eq('access_type', 'public')
          .order('created_at', { ascending: false })
          .range(pageParam, pageParam + limit - 1)

        return data
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage && lastPage.length < limit) return undefined // 마지막 페이지에 도달하면 undefined 반환
        return allPages.length * limit // 다음 페이지의 offset 반환
      },
    }),

  getLikedPost: (
    supabase: SupabaseClient,
    userId: string,
    limit: number,
    meId?: string,
  ) =>
    infiniteQueryOptions({
      queryKey: queryKey.post.liked(userId, meId),
      queryFn: async ({ pageParam = 0 }) => {
        const { data } = await supabase
          .from('like')
          .select(
            `
            *,
            post!like_post_id_fkey(
              *,
              like(count),
              user_info(
                avatar_url,
                email,
                user_name
              )
            )
            `,
          )
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .range(pageParam, pageParam + limit - 1)
        let publicData
        const isMe = meId === userId

        isMe
          ? (publicData = data)
          : (publicData = data?.map((item) =>
              item.post.access_type === 'public'
                ? item
                : {
                    ...item,
                    post: { title: null, content: null },
                  },
            ))

        return publicData
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage && lastPage.length < limit) return undefined
        return allPages.length * limit
      },
    }),

  getUserPostThatDay: (
    supabase: SupabaseClient,
    authorId: string,
    startOfDay: string | null,
    endOfDay: string | null,
    meId?: string,
  ) =>
    queryOptions({
      queryKey: queryKey.post.thatDay(startOfDay, endOfDay, authorId),
      queryFn: async () => {
        const { data } = await supabase
          .from('post')
          .select(
            `
            *,
            like(count),
            user_info(
              email,
              user_name,
              avatar_url
            )
            `,
          )
          .gte('created_at', startOfDay)
          .lte('created_at', endOfDay)
          .eq('user_id', authorId)
          .order('created_at', { ascending: false })

        let publicData
        const isMe = meId === authorId

        isMe
          ? (publicData = data)
          : (publicData = data?.map((item) =>
              item.access_type === 'public'
                ? item
                : { ...item, title: null, content: null },
            ))

        return publicData
      },
      enabled: !!startOfDay && !!endOfDay,
    }),

  getAllUserPost: (
    supabase: SupabaseClient,
    authorId: string,
    postType: 'journal' | 'article',
    limit: number = 10,
    meId?: string,
  ) =>
    infiniteQueryOptions({
      queryKey: queryKey.post.byPostType(postType, authorId),
      queryFn: async ({ pageParam = 0 }) => {
        const { data } = await supabase
          .from('post')
          .select(
            `
            *,
            like(count),
            user_info(
              email,
              user_name,
              avatar_url
            )
            `,
          )
          .eq('user_id', authorId)
          .eq('post_type', postType)
          .order('created_at', { ascending: false })
          .range(pageParam, pageParam + limit - 1)
        let publicData
        const isMe = meId === authorId

        isMe
          ? (publicData = data)
          : (publicData = data?.map((item) =>
              item.access_type === 'public'
                ? item
                : { ...item, content: null, title: null },
            ))

        return publicData
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage && lastPage.length < limit) return undefined
        return allPages.length * limit
      },
    }),

  getPost: (supabase: SupabaseClient, postId?: number) =>
    queryOptions<IPostWithUserInfo>({
      queryKey: queryKey.post.detail(postId),
      queryFn: async () => {
        const { data } = await supabase
          .from('post')
          .select(
            `
            *,
            like(count),
            user_info(
              email,
              user_name,
              avatar_url,
              about_me
            )
            `,
          )
          .eq('id', postId)
          .single()

        return data
      },
      enabled: !!postId,
    }),

  checkLiked: (
    supabase: SupabaseClient,
    postId?: number,
    meId?: string | null,
  ) =>
    queryOptions({
      queryKey: queryKey.post.checkLiked(postId, meId),
      queryFn: async () => {
        const { data } = await supabase
          .from('like')
          .select('*')
          .eq('post_id', postId)
          .eq('user_id', meId)

        return data && data?.length >= 1
      },
      enabled: !!meId,
    }),

  getMyUsedWords: (supabase: SupabaseClient, userId: string) =>
    queryOptions<Tables<'user_words'>>({
      queryKey: queryKey.word.used(userId),
      queryFn: async () => {
        const { data } = await supabase
          .from('user_words')
          .select()
          .eq('user_id', userId)
          .single()

        return data
      },
    }),

  getUsedWords: (supabase: SupabaseClient, word: string, trigger: boolean) =>
    queryOptions<Tables<'word_dictionary'>>({
      queryKey: queryKey.word.detail(word),
      queryFn: async () => {
        const { data } = await supabase
          .from('word_dictionary')
          .select()
          .eq('word', word)
          .single()

        return data
      },
      enabled: trigger,
    }),
}
