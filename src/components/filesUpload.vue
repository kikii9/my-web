<template>
  <el-dialog v-model="dialogVisible" title="添加数据">
    <el-form v-model="uploadFrom">
      <el-form-item label="文件上传:">
        <el-upload
          style="width: 80%"
          drag
          multiple
          :limit="excelLimit"
          :on-success="uploadSuccess"
          accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">将文件拖到此处<em>或点击上传</em></div>
          <template #tip>
            <div class="el-upload__tip">请上传 .xls , .xlsx 标准格式文件</div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="数据覆盖:">
        <el-switch v-model="is_cover" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup name="filesUpload">
import { ref, defineEmits } from 'vue'
const excelLimit = ref(1)
const dialogVisible = ref(false)
const parameter = ref({})
const is_cover = ref(false)
const emit = defineEmits(['acceptParams'])

// 接收父组件参数
const acceptParams = (params) => {
  parameter.value = params
  emit('gatewayData', parameter.value)
  dialogVisible.value = true
}
const uploadExcel = (param) => {
  console.log(param)
}
const uploadSuccess = (files) => {
  console.log('上传成功' + JSON.stringify(files))
}
// 接受父组件得参数
defineExpose({
  acceptParams,
})
</script>
