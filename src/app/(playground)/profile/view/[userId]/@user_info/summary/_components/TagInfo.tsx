import Spinner from '@/src/components/shared/Spinner'
import Text from '@/src/components/shared/Text'
import { supabase } from '@/src/lib/supabase/client'
import { postQuery } from '@/src/services/queries/post/post-query'
import { IFavoriteWord } from '@/src/types/post'
import { useQuery } from '@tanstack/react-query'
import { RefObject } from 'react'

interface Props {
  word: IFavoriteWord
  trigger: boolean
  onTransitionEnd: () => void
  targetRef: RefObject<HTMLDivElement>
}

export default function TagInfo({
  word,
  onTransitionEnd,
  trigger,
  targetRef,
}: Props) {
  const { data, isFetching } = useQuery(
    postQuery.getUsedWords(supabase, word.word, trigger),
  )

  return (
    <div
      data-status="closed"
      onTransitionEnd={onTransitionEnd}
      ref={targetRef}
      className="data-slideDown status-slideDown absolute -top-10 z-10 hidden origin-bottom-left text-nowrap rounded-md bg-white p-2 shadow-md dark:bg-var-darkgray"
    >
      {isFetching ? (
        <Spinner size={20} />
      ) : (
        <>
          <Text size="xs">단어 사용 횟수 : {word.count}</Text>
          <Text size="xs">다른 사람들이 사용한 횟수 : {data?.count}</Text>
        </>
      )}
    </div>
  )
}
