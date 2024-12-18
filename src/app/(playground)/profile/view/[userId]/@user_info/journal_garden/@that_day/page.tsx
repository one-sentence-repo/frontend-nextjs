'use client'

import Title from '@/src/components/shared/Title'
import Empty from '@/src/components/shared/Empty'
import { useQuery } from '@tanstack/react-query'
import { postQuery } from '@/src/services/queries/post/post-query'
import { supabase } from '@/src/lib/supabase/client'
import { YStack } from '@/src/components/shared/Stack'
import Spinner from '@/src/components/shared/Spinner'
import { useEffect, useState } from 'react'
import { Container } from '@/src/components/shared/Container'
import useMe from '@/src/hooks/useMe'
import PostCard from '@/src/app/(playground)/(home)/_components/PostCard'

interface Props {
  params: { userId: string }
  searchParams: { year: string; month: string; date: string }
}

export default function PrevOnePost({ params, searchParams }: Props) {
  const year = parseInt(searchParams.year)
  const month = parseInt(searchParams.month)
  const date = parseInt(searchParams.date)
  const { me, session } = useMe()
  const [startOfDay, setStartOfDay] = useState('')
  const [endOfDay, setEndOfDay] = useState('')

  const { data: posts, isFetching } = useQuery(
    postQuery.getUserPostThatDay(
      supabase,
      params.userId,
      startOfDay,
      endOfDay,
      me?.id,
    ),
  )

  useEffect(() => {
    if (year && month && date) {
      setStartOfDay(new Date(year, month - 1, date, 0, 0, 0).toISOString())
      setEndOfDay(new Date(year, month - 1, date, 23, 59, 59).toISOString())
    }
  }, [year, month, date])

  if (isFetching) {
    return (
      <Container>
        <YStack gap={8}>
          <Title>그날의 기록</Title>
          <Title type="sub" size="sm" className="mb-4">
            {`${month}월 ${date}일, ${year}`}
          </Title>
          <Spinner.Container>
            <Spinner size={60} />
          </Spinner.Container>
        </YStack>
      </Container>
    )
  }

  if (!year || !month || !date) {
    return (
      <Container className="animate-fade-in">
        <YStack gap={8}>
          <Title>그날의 기록</Title>
          <Empty>
            <Empty.Text>선택된 날이 없습니다.</Empty.Text>
          </Empty>
        </YStack>
      </Container>
    )
  }

  return (
    <Container className="animate-fade-in">
      <YStack gap={8}>
        <Title>그날의 기록</Title>
        <Title type="sub" size="sm" className="mb-4">
          {`${month}월 ${date}일, ${year}`}
        </Title>
        {posts && posts?.length >= 1 ? (
          <>
            <YStack gap={8}>
              {posts?.map((post) =>
                post.content ? (
                  <PostCard
                    key={post?.id}
                    meId={session ? me?.id : null}
                    post={post}
                    session={session}
                    startOfDay={startOfDay}
                    endOfDay={endOfDay}
                    postUserInfo={post?.user_info}
                  />
                ) : (
                  <Empty key={post.id}>
                    <Empty.Icon view="0 -960 960 960" size={20}>
                      <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
                    </Empty.Icon>
                    <Empty.Text>비공개된 게시물 입니다.</Empty.Text>
                  </Empty>
                ),
              )}
            </YStack>
          </>
        ) : (
          <Empty>
            <Empty.Icon view="0 -960 960 960" size={20}>
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </Empty.Icon>
            <Empty.Text>삭제된 게시물 입니다.</Empty.Text>
          </Empty>
        )}
      </YStack>
    </Container>
  )
}
