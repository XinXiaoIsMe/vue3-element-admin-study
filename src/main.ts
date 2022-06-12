import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import '@/styles/index.scss'
import i18n from '@/lang/index'
import 'virtual:svg-icons-register'

const app = createApp(App)
app
  .use(router)
  .use(createPinia())
  .use(i18n)
  .use(ElementPlus)
  .mount('#app')
