import DeleteCommentModal from '@/src/app/(playground)/modal/delete_comment/[commentId]/page'

interface Props {
  params: { commentId: string }
  searchParams: { post_id: string }
}

export default function Page({ params, searchParams }: Props) {
  return <DeleteCommentModal params={params} searchParams={searchParams} />
}
