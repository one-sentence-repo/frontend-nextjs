'use client'

import { XStack } from '@/src/components/shared/Stack'
import SideOptionsContainer from './_containers/SideOptionsContainer'
import { useState } from 'react'
import PostContainer from './_containers/PostContainer'

export type TAccess = 'public' | 'private'
export type TPost = 'journal' | 'article'
export type TEmotion = '0%' | '25%' | '50%' | '75%' | '100%' | null

interface Props {
  searchParams: { post_id: string }
}

export default function Default({ searchParams }: Props) {
  const [selectedEmotion, setSelectedEmotion] = useState<TEmotion | null>('50%')
  const [accessType, setAccessType] = useState<TAccess>('public')
  const [postType, setPostType] = useState<TPost>('journal')

  return (
    <XStack gap={8} className="flex-1 animate-fade-in">
      <PostContainer
        searchParams={searchParams}
        selectedEmotion={selectedEmotion}
        setSelectedEmotion={setSelectedEmotion}
        accessType={accessType}
        setAccessType={setAccessType}
        postType={postType}
        setPostType={setPostType}
      />
      <SideOptionsContainer
        searchParams={searchParams}
        selectedEmotion={selectedEmotion}
        setSelectedEmotion={setSelectedEmotion}
        accessType={accessType}
        setAccessType={setAccessType}
        postType={postType}
        setPostType={setPostType}
      />
    </XStack>
  )
}
