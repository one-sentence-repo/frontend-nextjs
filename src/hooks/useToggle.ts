import { useMemo, useState } from 'react'

export default function useToggle() {
  const [isOpen, setOpen] = useState(false)

  return useMemo(() => {
    return {
      isOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
      toggle: () => setOpen((prev) => !prev),
    }
  }, [isOpen])
}
