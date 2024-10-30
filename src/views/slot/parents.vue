<template>
    <el-dialog v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose">
        <slot></slot>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogVisible = false">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script lang="ts" setup>
import { ref, defineProps, onMounted } from 'vue'
import { ElMessageBox } from 'element-plus'

const props = defineProps(['slots'])

onMounted(() => {
    // 获取slot实例
    // const slotInstance = slots.default
    console.log("🚀 ~ file: parents.vue:25 ~ onMounted ~ slotInstance:", slotInstance)

    // 在控制台输出slot的内容
});

const dialogVisible = ref(true)

const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}
</script>
<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>