import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    username: 'ccattempt'
  })
})
