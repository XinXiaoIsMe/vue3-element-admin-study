import { useUserStore } from './module/user'
import { useAppStore } from './module/app'

export const useStore = () => ({
  user: useUserStore(),
  app: useAppStore()
})
