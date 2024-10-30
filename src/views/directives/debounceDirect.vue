<template>
  <el-card shadow="never">
    <div class="card-title">防抖指令 🍍🍓🍓🍓🍓</div>
    <br />
    <el-button type="primary" v-debounce="debounceClick">防抖按钮(1秒后执行)</el-button>
  </el-card>
</template>

<script setup>
import { ElMessage } from "element-plus";
const debounceClick = () => {
  ElMessage.success("我是防抖指令");
};
</script>
