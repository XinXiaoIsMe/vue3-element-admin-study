import { UserConfig, ConfigEnv, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default ({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue()
    ],
    server: {
      open: true,
      host: '0.0.0.0',
      port: Number(env.VITE_APP_PORT)
    },
    resolve: {
      alias: {
        '@': resolve('./src')
      }
    }
  }
}
