import BackButton from '@/src/components/shared/BackButton'
import { Container } from '@/src/components/shared/Container'
import LinkButton from '@/src/components/shared/LinkButton'
import { XStack, YStack } from '@/src/components/shared/Stack'
import Text from '@/src/components/shared/Text'
import Title from '@/src/components/shared/Title'
import { routes } from '@/src/routes'

export default function NotFound() {
  return (
    <Container className="flex h-dvh flex-1 items-center justify-center">
      <YStack gap={12} className="items-center">
        <XStack className="items-end">
          <Title size="bigger">404</Title>
          <Title>Page</Title>
        </XStack>
        <YStack className="justify-center">
          <Text>이 페이지는 존재하지 않습니다. </Text>
          <Text>처음으로 돌아가세요. </Text>
        </YStack>
        <XStack>
          <BackButton variant="secondary" size="md" className="p-3">
            뒤로가기
          </BackButton>
          <LinkButton href={routes.home}>메인 화면으로</LinkButton>
        </XStack>
      </YStack>
    </Container>
  )
}
