import { defineStore } from 'pinia'
import { LoginFormData } from '@/types'
import { login } from '@/api/login'
import { localStorage } from '@/utils/storage'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: 'ccattempt',
    token: localStorage.get('token') || ''
  }),
  actions: {
        /**
     * 用户登录请求
     * @param userInfo 登录用户信息
     *  username: 用户名
     *  password: 密码
     *  code: 验证码
     *  uuid: 匹配正确验证码的 key
     */
         login(userInfo: LoginFormData) {
          const { username, password, code, uuid } = userInfo
          return new Promise((resolve, reject) => {
            login({
              username: username.trim(),
              password: password,
              grant_type: 'captcha',
              code: code,
              uuid: uuid
            })
              .then(response => {
                const { access_token, token_type } = response.data
                const accessToken = token_type + ' ' + access_token
                localStorage.set('token', accessToken)
                this.token = accessToken
                resolve(access_token)
              })
              .catch(error => {
                reject(error)
              })
          })
        },
  }
})
