import { useAppStore } from './module/user'

export const useStore = () => ({
  user: useAppStore()
})
