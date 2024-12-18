import Button from '@/src/components/shared/Button'
import Icon from '@/src/components/shared/Icon'

interface Props {
  onClose: () => void
}

export default function BackButtonSection({ onClose }: Props) {
  return (
    <Button variant="icon" onClick={onClose} className="w-fit">
      <Icon>
        <g>
          <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
        </g>
      </Icon>
    </Button>
  )
}
