import { getLanguage } from '@/lang'
import { defineStore } from 'pinia'
import { localStorage } from '@/utils/storage'

export const useAppStore = defineStore('app', {
  state: () => ({
    language: getLanguage()
  }),
  actions: {
    setLanguage (language: string) {
      this.language = language
      localStorage.set('language', language)
    }
  }
})