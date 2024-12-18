import { Container } from '@/src/components/shared/Container'
import Text from '@/src/components/shared/Text'

export default function LockContent() {
  return (
    <Container className="size-full w-full cursor-pointer rounded-md bg-white p-4 shadow-sm transition duration-300 ease-in-out hover:shadow-lg dark:bg-var-darkgray">
      <Text>비공개된 게시물입니다.</Text>
    </Container>
  )
}
