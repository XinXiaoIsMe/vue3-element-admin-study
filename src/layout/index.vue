<script setup lang="ts">
import { useStore } from '@/store'

const store = useStore()
console.log('store data', store)
</script>

<template>
<div>
  <el-button type="success">init template success!</el-button>
</div>
</template>

<style>

</style>
