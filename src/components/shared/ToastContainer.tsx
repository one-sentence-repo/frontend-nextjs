import { useToast } from '@/src/store/useToast'
import Toast from './Toast'
import Portal from './Portal'

export default function ToastContainer() {
  const { toastContents } = useToast()

  return (
    toastContents.length > 0 && (
      <Portal>
        <div className="fixed bottom-10 right-10 z-50 flex flex-col gap-2 transition">
          {toastContents.map((content) => (
            <Toast key={content.id} content={content} />
          ))}
        </div>
      </Portal>
    )
  )
}
