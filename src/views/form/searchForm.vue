<template>


  <el-steps style="max-width: 600px" :active="active" finish-status="success">
    <el-step title="客户基本信息" />
    <el-step title="开户基本信息" />
    <el-step title="存款/自助限额设置" />
    <el-step title="等待授权" />
  </el-steps>

  <el-button style="margin-top: 12px" @click="next">Next step</el-button>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const active = ref(0);

const next = () => {
  if (active.value++ > 2) active.value = 0;
};
</script>
