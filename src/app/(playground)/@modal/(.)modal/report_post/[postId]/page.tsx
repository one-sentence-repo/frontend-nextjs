import ReportPostModal from '@/src/app/(playground)/modal/report_post/[postId]/page'

interface Props {
  params: { postId: string }
}

export default function Page({ params }: Props) {
  return <ReportPostModal params={params} />
}
