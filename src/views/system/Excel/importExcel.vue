<template>
  <el-card>
    <el-button type="primary" @click="importExcel">导入Excel</el-button>
  </el-card>
  <filesUpload ref="importRef" @gatewayData="gatewayData"></filesUpload>

  <el-card class="mt10">
    <el-table :data="tableData" border size="small"></el-table>
  </el-card>
</template>
<script setup>
import { ref } from 'vue'
// import XLSX from 'xlsx'
import filesUpload from '../../../components/filesUpload.vue'
const importRef = ref('')
const tableData = ref([])
const importExcel = () => {
  let params = {}
  importRef.value.acceptParams(params)
  console.log(importRef.value.acceptParams(params))
}

const gatewayData = (params) => {
  console.log(params)
}
</script>

<style lang="scss" scoped>
.mt-4 {
  float: right;
  text-align: right;
  margin-bottom: 20px;
}
</style>
