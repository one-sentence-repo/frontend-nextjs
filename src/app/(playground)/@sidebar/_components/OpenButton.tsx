import Button from '@/src/components/shared/Button'
import Icon from '@/src/components/shared/Icon'

interface Props {
  isOpen: boolean
  onClick: () => void
}

export default function OpenButton({ isOpen, onClick }: Props) {
  return (
    <Button variant="icon" onClick={onClick} className="w-full self-end">
      {isOpen ? (
        <Icon view="0 -960 960 960" size={24}>
          <path d="M660-320v-320L500-480l160 160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm120-80v-560H200v560h120Zm80 0h360v-560H400v560Zm-80 0H200h120Z" />
        </Icon>
      ) : (
        <Icon view="0 -960 960 960" size={24}>
          <path d="M500-640v320l160-160-160-160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm120-80v-560H200v560h120Zm80 0h360v-560H400v560Zm-80 0H200h120Z" />
        </Icon>
      )}
    </Button>
  )
}
