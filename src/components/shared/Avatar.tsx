import cn from '@/src/lib/cn'
import { cva } from 'class-variance-authority'
import Image from 'next/image'
import profileImage from '@/public/profile.svg'
import { useTheme } from '@/src/store/useTheme'

interface Props {
  src?: string | null
  size?: 'xs' | 'sm' | 'md' | 'base' | 'lg' | 'xl'
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  ring?: boolean
  hoverEffect?: boolean
  className?: string
  onClick?: () => void
}

const avatarVariants = cva(
  'relative flex-shrink-0 overflow-hidden rounded-full transition duration-300 ease-in-out',
  {
    variants: {
      size: {
        xs: 'size-8',
        sm: 'size-9',
        base: 'size-12',
        md: 'size-20',
        lg: 'size-40',
        xl: 'size-52',
      },
      shadow: {
        none: '',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
      },
    },
  },
)

export default function Avatar({
  src,
  size = 'md',
  ring = false,
  shadow = 'none',
  hoverEffect = true,
  onClick,
  className,
}: Props) {
  const { color } = useTheme()
  return (
    <div
      onClick={onClick}
      className={cn(
        avatarVariants({ size, shadow }),
        hoverEffect && 'hover:ring-4 group-hover:ring-4',
        ring && 'border border-zinc-400 dark:border-zinc-200',
        color === 'blue' && 'ring-var-blue/65',
        color === 'orange' && 'ring-var-orange/65',
        color === 'yellow' && 'ring-var-yellow/65',
        color === 'green' && 'ring-var-green/65',
        color === 'black' && 'ring-var-black/65',
        className,
      )}
    >
      {src ? (
        <Image src={src} fill className="object-cover" alt="프로필 이미지" />
      ) : (
        <Image
          src={profileImage}
          fill
          alt="프로필 이미지 없음"
          className="bg-zinc-400 object-cover dark:bg-var-darkgray"
        />
      )}
    </div>
  )
}
