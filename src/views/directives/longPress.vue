<template>
  <el-card shadow="never">
    <div class="card-title">长按指令 🍍🍓🍓🍓🍓</div>
    <br />
    <el-button type="primary" v-longPress="debounceClick">长按指令</el-button>
  </el-card>
</template>

<script setup>
import { ElMessage } from "element-plus";
const debounceClick = () => {
  ElMessage.success("我是长按指令");
};
</script>
