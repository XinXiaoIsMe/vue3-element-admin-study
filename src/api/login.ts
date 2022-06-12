import request from '@/utils/request'
import  { Captcha, LoginFormData, LoginResponseData } from '@/types'
import { AxiosPromise } from 'axios'

/**
 * 登录
 * @param data
 */
 export function login(data: LoginFormData): AxiosPromise<LoginResponseData> {
  return request({
    url: '/youlai-auth/oauth/token',
    method: 'post',
    params: data,
    headers: {
      Authorization: 'Basic bWFsbC1hZG1pbi13ZWI6MTIzNDU2' // 客户端信息Base64明文：mall-admin-web:123456
    }
  })
}

/**
 * 获取图片验证码
 */
export function getCaptcha(): AxiosPromise<Captcha> {
  return request({
    url: '/captcha?t=' + new Date().getTime().toString(),
    method: 'get'
  })
}
