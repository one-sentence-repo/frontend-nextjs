import Icon from '@/src/components/shared/Icon'
import BookMark from './BookMark'
import SelectedMenuBackground from './SelectedMenuBackground'
import Button from '@/src/components/shared/Button'
import { useRouter } from 'next/navigation'
import { ZStack } from '@/src/components/shared/Stack'
import { useTransition } from 'react'
import Spinner from '@/src/components/shared/Spinner'
import { routes } from '@/src/routes'

interface Props {
  isSelected?: boolean
  closeToolTip: () => void
}

export default function SidebarWriteButtonWithLogo({
  isSelected,
  closeToolTip,
}: Props) {
  const router = useRouter()
  const [isLoading, startTransition] = useTransition()

  const pushWritePage = () => {
    router.push(routes.post.new)
    closeToolTip()
  }

  return (
    <ZStack>
      <BookMark isSelected={isSelected} />
      <Button
        variant="icon"
        size="icon"
        onClick={() => startTransition(() => pushWritePage())}
      >
        <SelectedMenuBackground isSelected={isSelected} />
        {isLoading ? (
          <Spinner.Container>
            <Spinner size={34} />
          </Spinner.Container>
        ) : (
          <Icon
            size={34}
            view="0 0 386 386"
            className="relative text-zinc-300 dark:text-zinc-600"
          >
            <circle cx="185" cy="185" r="185" fill="currentColor" />
            <ellipse cx="100" cy="336" rx="83" ry="21" fill="#B9B9B9" />
            <path
              d="M100 335.994L214.5 90C243 25 318 23 352.5 33.9999C326.9 39.4867 261.333 172.307 238.432 234.111C223.547 240.452 192.468 247.026 178.789 249.52C197.627 249.946 221.296 247.084 230.776 245.599C232.388 248.864 228.839 258.619 201.749 271.515C160.16 274.651 130.159 302.745 120.5 315.866C120.5 315.866 129.5 316 135 317C140.5 318 114.034 329.047 114.034 329.047L182.5 335.994L100 335.994Z"
              fill="white"
            />
          </Icon>
        )}
      </Button>
    </ZStack>
  )
}
