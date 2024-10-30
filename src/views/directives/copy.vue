<template>
  <el-card shadow="never">
    <div>复制指令 🍤🍤🍤🍤🍤🍤</div>
    <br />
    <el-input v-model="input3" placeholder="复制指令 🍤🍤🍤🍤🍤" style="width: 100%">
      <template #append>
        <el-button :icon="CopyDocument" v-copy="input3">复制</el-button>
      </template>
    </el-input>
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import { CopyDocument } from "@element-plus/icons-vue";
const input3 = ref("复制内容复制内容复制内容复制内容复制内容");
</script>
