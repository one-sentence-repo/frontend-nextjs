import { Container } from '@/src/components/shared/Container'
import { YStack } from '@/src/components/shared/Stack'
import Text from '@/src/components/shared/Text'
import Title from '@/src/components/shared/Title'
import cn from '@/src/lib/cn'

interface Props {
  title: string
  content: string | number | null
  unit: string
  className?: string
}

export default function HistoryBlock({
  title,
  content,
  unit,
  className,
}: Props) {
  return (
    <Container
      className={cn(
        'flex-1 rounded-lg bg-white p-2 shadow-sm sm:p-4 dark:bg-var-darkgray',
        className,
      )}
    >
      <YStack gap={4} className="items-center">
        <YStack gap={0}>
          <Title
            type="caption"
            size="xs"
            className={cn(
              title === '평균 감정 농도' && 'text-white dark:text-white',
              className,
            )}
          >
            {title}
          </Title>
        </YStack>
        <Text
          size="bigger"
          className={cn(
            title === '평균 감정 농도' && 'text-white dark:text-white',
            className,
          )}
        >
          {content}
          <Text
            as="span"
            className={cn(
              title === '평균 감정 농도' && 'text-white dark:text-white',
              className,
            )}
          >
            {unit}
          </Text>
        </Text>
      </YStack>
    </Container>
  )
}
