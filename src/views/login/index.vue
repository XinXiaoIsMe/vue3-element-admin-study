<script setup lang="ts">
import { ref, reactive, toRefs, nextTick, onMounted } from 'vue'

// 组件依赖
import SvgIcon from '@/components/SvgIcon/index.vue'
import LangSelect from '@/components/LangSelect/index.vue'
import { ElInput, ElForm } from 'element-plus'

// 路由依赖
import router from '@/router'

// 状态管理依赖
import { useStore } from '@/store'

// API依赖
import { getCaptcha } from '@/api/login'
import { LoginFormData } from '@/types'

const state = reactive({
  loginForm: {
    username: 'admin',
    password: '123456',
    code: '',
    uuid: ''
  } as LoginFormData,
  loginRules: {
    username: [{ required: true, trigger: 'blur' }],
    password: [{ required: true, trigger: 'blur', validator: validatePassword }]
  },
  passwordType: 'password',
  captchaBase64: '',
  loading: false,
  capslockTooltipDisabled: true
})

const {
  loginForm,
  loginRules,
  passwordType,
  captchaBase64,
  loading,
  capslockTooltipDisabled
} = toRefs(state)

const passwordRef = ref(ElInput)
const loginFormRef = ref(ElForm)


const { user } = useStore()

const showPwd = () =>  {
  if (state.passwordType === 'password') {
    state.passwordType = '';
  } else {
    state.passwordType = 'password';
  }
  nextTick(() => {
    passwordRef.value.focus();
  });
}

function validatePassword (rule: any, value: any, callback: any) {
  if (value.length < 6) {
    callback(new Error('The password can not be less than 6 digits'))
  } else {
    callback()
  }
}

function handleLogin () {
  loginFormRef.value.validate((valid: boolean) => {
    if (valid) {
      state.loading = true
      user
        .login(state.loginForm)
        .then(() => {
          router.push('/')
          state.loading = false
        })
        .catch(() => {
          state.loading = false
          handleCaptchaGenerate()
        });
    } else {
      return false
    }
  })
}

// 获取验证码
function handleCaptchaGenerate() {
  getCaptcha().then(({ data }) => {
    const { img, uuid } = data
    state.captchaBase64 = img
    state.loginForm.uuid = uuid
  });
}

// 检查大小写
function checkCapslock (event: KeyboardEvent) {
  const { key } = event
  state.capslockTooltipDisabled =
    !!(key && key.length === 1 && key >= 'A' && key <= 'Z')
}
       

onMounted(() => {
  handleCaptchaGenerate()
})
</script>

<template>
<div class="login-container">
  <el-form
    ref="loginFormRef"
    class="login-form"
    auto-complete="on"
    label-position="left"
    :model="loginForm"
    :rules="loginRules"
  >
    <div class="title-container">
      <h1 class="title">{{ $t('login.title') }}</h1>
      <lang-select class="set-language" />
    </div>

    <el-form-item prop="username">
      <span class="svg-container">
        <svg-icon icon-class="user" />
      </span>
      <el-input :placeholder="$t('login.username')" v-model="loginForm.username" auto-complete="on" />
    </el-form-item>

    <el-tooltip :disabled="capslockTooltipDisabled" content="Caps lock is On" placement="right">
    <el-form-item prop="password">
      <span class="svg-container">
        <svg-icon icon-class="password" />
      </span>
      <el-input ref="passwordRef" :placeholder="$t('login.password')" :key="passwordType" :type="passwordType"  v-model="loginForm.password" auto-complete="on" @keyup="checkCapslock" @blur="capslockTooltipDisabled = true" />
      <span class="show-pwd" @click="showPwd">
        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
      </span>
    </el-form-item>
   </el-tooltip>

    <el-form-item prop="code">
      <span class="svg-container">
        <svg-icon icon-class="validCode" />
      </span>
      <el-input :placeholder="$t('login.code')" v-model="loginForm.code" auto-complete="off" style="width: 65%;" />
      <div class="captcha">
        <img :src="captchaBase64" @click="handleCaptchaGenerate" height="38px" />
      </div>
    </el-form-item>
    <el-button size="default" type="primary" :loading="loading" style="width: 100%; margin-bottom: 30px" @click.prevent="handleLogin">{{ $t('login.login') }}</el-button>
    <div class="tips">
      <span>{{ $t('login.username') }}: admin</span>
      <span> {{ $t('login.password') }}: 123456</span>
    </div>
  </el-form>
</div>
</template>

<style lang="scss">
@import "./index.scss";
</style>

<style lang="scss" scoped>
@import "./index.scoped.scss";
</style>