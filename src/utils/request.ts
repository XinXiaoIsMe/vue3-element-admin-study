import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useStore } from '@/store'
import { localStorage } from './storage'
import { ElMessage, ElMessageBox } from 'element-plus'

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8;' }
})

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (!config.headers) throw new Error(`Expected 'config' and 'config.headers' not to be undefined`)
    const { user } = useStore()
    if (user.token) {
      config.headers.Authorization = `${localStorage.get('token')}`; 
    }
    
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, msg } = response.data
    if (code === '00000') {
      return response.data
    } else {
      // 二进制流数据
      if (response.data instanceof ArrayBuffer) {
        return response
      }
      
      ElMessage({
        message: msg || '系统出错',
        type: 'error'
      })

      return Promise.reject(new Error(msg || ''))
    }
  },
  error => {
    const { code, msg } = error.response.data
    if (code === 'A0230') {
      // token 过期
      localStorage.clear() // 清除浏览器全部缓存
      window.location.href = '/' // 跳转登录页
      ElMessageBox.alert('当前页面已失效，请重新登录', '提示', {})
    } else {
      ElMessage({
        message: msg || '系统出错',
        type: 'error'
      })
    }
    return Promise.reject(new Error(msg || 'Error'))
  }
)

export default service