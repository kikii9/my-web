<template>
  <el-card shadow="never">
    <div class="card-title">节流指令 🍍🍓🍓🍓🍓</div>
    <br />
    <el-button type="primary" v-throttle="throttleClick">节流指令</el-button>
  </el-card>
</template>

<script setup>
import { ElMessage } from 'element-plus'
const throttleClick = () => {
  ElMessage.success('我是节流指令')
}
</script>
