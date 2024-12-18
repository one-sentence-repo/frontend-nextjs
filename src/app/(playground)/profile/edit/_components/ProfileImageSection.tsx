import Avatar from '@/src/components/shared/Avatar'
import Button from '@/src/components/shared/Button'
import Icon from '@/src/components/shared/Icon'
import { XStack, YStack, ZStack } from '@/src/components/shared/Stack'
import Text from '@/src/components/shared/Text'
import Title from '@/src/components/shared/Title'
import { ComponentProps, useRef } from 'react'

interface Props extends ComponentProps<'input'> {
  imagePreview: string | null
}

export default function ProfileImageSection({ onChange, imagePreview }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handlePreviewClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  return (
    <YStack gap={4}>
      <Title>프로필 사진</Title>
      <XStack className="items-end">
        <ZStack>
          <Avatar src={imagePreview} size="xl" ring shadow="sm" />
          <input
            ref={inputRef}
            type="file"
            onChange={onChange}
            accept="image/*"
            className="hidden"
          />
          <Button
            onClick={handlePreviewClick}
            className="absolute bottom-0 right-0 rounded-full"
          >
            <Icon view="0 -960 960 960">
              <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
            </Icon>
          </Button>
        </ZStack>
        <Text type="caption">5MB 이하의 PNG,JPG,GIF 파일을 올려주세요.</Text>
      </XStack>
    </YStack>
  )
}
