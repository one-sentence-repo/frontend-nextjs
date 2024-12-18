import { create } from 'zustand'

export interface ToastContent {
  id: number
  text: string
  type: 'info' | 'warning'
  icon?: string
}

interface ToastState {
  toastContents: ToastContent[]
  openToast: (toast: Omit<ToastContent, 'id'>) => void
  closeToast: (toastId: number) => void
}

export const useToast = create<ToastState>((set) => ({
  toastContents: [],

  openToast: (newContent) =>
    set((state) => {
      const nextToastContent = {
        ...newContent,
        id: new Date().getTime(),
      }
      return {
        toastContents: [...state.toastContents, nextToastContent],
      }
    }),

  closeToast: (toastId) =>
    set((state) => {
      const nextToastContents = state.toastContents.filter(
        (toast) => toast.id !== toastId,
      )
      return { toastContents: nextToastContents }
    }),
}))
