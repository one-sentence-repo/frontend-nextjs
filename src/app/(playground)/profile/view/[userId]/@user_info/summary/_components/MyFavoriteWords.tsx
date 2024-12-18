'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { postQuery } from '@/src/services/queries/post/post-query'
import Empty from '@/src/components/shared/Empty'
import Title from '@/src/components/shared/Title'
import { List } from '@/src/components/shared/List'
import FavoriteWordTag from './FavoriteWordTag'
import { Container } from '@/src/components/shared/Container'
import { YStack } from '@/src/components/shared/Stack'
import { IFavoriteWord } from '@/src/types/post'

interface Props {
  userId: string
}

export default function MyFavoriteWords({ userId }: Props) {
  const { data: words } = useSuspenseQuery(
    postQuery.getMyUsedWords(supabase, userId),
  )
  const typedWords = words?.words as unknown as IFavoriteWord[]
  const sortedUsedWords = typedWords?.sort((a, b) => b?.count - a?.count)
  const shouldRenderWords = sortedUsedWords?.filter((word) => word.count > 1)

  return (
    <Container className="animate-fade-in">
      <YStack gap={8}>
        <Title>가장 많이 사용하는</Title>
        {shouldRenderWords?.length! >= 1 ? (
          <List className="flex flex-wrap gap-2">
            {shouldRenderWords?.map((word, index) => {
              if (index >= 20) {
                return null
              } else {
                return <FavoriteWordTag key={word.word} word={word} />
              }
            })}
          </List>
        ) : (
          <Empty>
            <Empty.Text>아직 자주 사용하는 단어가 없습니다.</Empty.Text>
          </Empty>
        )}
      </YStack>
    </Container>
  )
}
