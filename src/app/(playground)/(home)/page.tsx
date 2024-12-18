import { Metadata } from 'next'
import { YStack } from '@/src/components/shared/Stack'
import FakeFormContainer from './_containers/FakeFormContainer'
import PostContainer from './_containers/PostContainer'

export const metadata: Metadata = {
  title: 'Home',
}

export default function Page() {
  return (
    <YStack gap={12} className="animate-fade-in">
      <FakeFormContainer />
      <PostContainer />
    </YStack>
  )
}
