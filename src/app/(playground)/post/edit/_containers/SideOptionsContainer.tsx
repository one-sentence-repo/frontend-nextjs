'use client'

import { useEffect } from 'react'
import { supabase } from '@/src/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'

import { postQuery } from '@/src/services/queries/post/post-query'
import { meQuery } from '@/src/services/queries/auth/me-query'

import { Container } from '@/src/components/shared/Container'
import { YStack } from '@/src/components/shared/Stack'
import Line from '@/src/components/shared/Line'
import PublishSection from '../_components/PublishSection'
import PostTypeSection from '../_components/PostTypeSection'
import EmotionSection from '../_components/EmotionSection'
import { TAccess, TEmotion, TPost } from '../page'

interface Props {
  searchParams: { post_id: string }
  selectedEmotion: TEmotion
  setSelectedEmotion: (emotion: TEmotion) => void
  accessType: TAccess
  setAccessType: (accessType: TAccess) => void
  postType: TPost
  setPostType: (postType: TPost) => void
}

export default function SideOptionsContainer({
  searchParams,
  selectedEmotion,
  setSelectedEmotion,
  accessType,
  setAccessType,
  postType,
  setPostType,
}: Props) {
  const postId = Number(searchParams.post_id)
  const router = useRouter()
  const { data: post } = useSuspenseQuery(postQuery.getPost(supabase, postId))
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))

  const isOwner = me?.userId === post?.user_id
  const handleChangeEmotion = (emotion: TEmotion | null) =>
    setSelectedEmotion(emotion)
  const handleChangeAccessType = (order: TAccess) => setAccessType(order)
  const handleChangePostType = (order: TPost) => setPostType(order)

  useEffect(() => {
    postType === 'article'
      ? handleChangeEmotion(null)
      : handleChangeEmotion('50%')
  }, [postType])

  return (
    <Container className="sticky left-4 top-8 hidden h-fit animate-fade-in-reverse rounded-md bg-white p-2 shadow-md max-lg:fixed sm:flex dark:bg-var-darkgray">
      <YStack as="nav" className="items-center">
        <PublishSection
          accessType={accessType}
          onChangeAccessType={handleChangeAccessType}
          isSide
        />
        <PostTypeSection
          postType={postType}
          onChangePostType={handleChangePostType}
          isSide
        />
        <Line className="w-full" />
        <EmotionSection
          selectedEmotion={selectedEmotion}
          onChangeEmotion={handleChangeEmotion}
          isSide
        />
      </YStack>
    </Container>
  )
}
