import DeletePostModal from '@/src/app/(playground)/modal/delete_post/[postId]/page'

interface Props {
  params: { postId: string }
}

export default function Page({ params }: Props) {
  return <DeletePostModal params={params} />
}
