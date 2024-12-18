import FollowingListModal from '@/src/app/(playground)/modal/following/[userId]/page'

interface Props {
  params: { userId: string }
}

export default function Page({ params }: Props) {
  return <FollowingListModal params={params} />
}
