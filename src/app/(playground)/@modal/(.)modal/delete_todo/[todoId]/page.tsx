import DeleteTodoModal from '@/src/app/(playground)/modal/delete_todo/[todoId]/page'

interface Props {
  params: { todoId: string }
  searchParams: { folder_id: string, color: string, order_from: 'main' | 'folder' }
}

export default function Page({ params, searchParams }: Props) {
  return <DeleteTodoModal params={params} searchParams={searchParams} />
}
