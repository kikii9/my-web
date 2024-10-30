<template>
  <el-card>
    <!-- <Row> 更多查看：<a href="https://vueflow.dev/">Vue Flow官方文档</a> </Row> -->
    <div class="mt-4">
      <el-button type="primary" @click="resetTransform">重置</el-button>
      <el-button type="success" @click="updatePos">修改属性</el-button>
      <el-button type="success" @click="toggleclass">修改样式</el-button>
      <el-button type="warning" @click="logToObject">查看属性</el-button>
    </div>
    <VueFlow v-model="elements" class="vue-flow-content">
      <Background />
      <MiniMap />
      <Controls />
    </VueFlow>
  </el-card>
  <el-dialog
    v-model="dialogVisible"
    title="流程图属性"
    width="70%"
    :before-close="handleClose"
  >
    <span>{{ dialogContent }}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'

import '@braks/vue-flow/dist/style.css'
import '@braks/vue-flow/dist/theme-default.css'
import {
  Background,
  Controls,
  MiniMap,
  VueFlow,
  isNode,
  useVueFlow,
} from '@braks/vue-flow'
import { ref } from 'vue'
// import { Message } from 'view-ui-plus'
const dialogVisible = ref(false)
const dialogContent = ref('')
const elementsDefault = [
  {
    id: '1',
    type: 'input',
    label: '自律',
    position: { x: 250, y: 5 },
    class: 'node-light',
  },
  {
    id: '2',
    label: '控玩玩手机的时间',
    position: { x: 100, y: 100 },
    class: 'node-light',
  },
  {
    id: '3',
    label: '养成良好生活习惯',
    position: { x: 400, y: 100 },
    class: 'node-light',
  },
  {
    id: '4',
    label: '培养阅读习惯',
    position: { x: 400, y: 200 },
    class: 'node-light',
  },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
]

const elements = ref(elementsDefault)
const {
  onPaneReady,
  onNodeDragStop,
  onConnect,
  addEdges,
  setTransform,
  toObject,
} = useVueFlow({
  defaultZoom: 1.5,
  minZoom: 0.2,
  maxZoom: 4,
})

onPaneReady(({ fitView }) => {
  fitView()
})
onNodeDragStop((e) => console.log('drag stop', e))
onConnect((params) => addEdges([params]))

const updatePos = () => {
  elements.value.forEach((el) => {
    if (isNode(el)) {
      el.position = {
        x: Math.random() * 400,
        y: Math.random() * 400,
      }
    }
  })
}

const logToObject = () => {
  dialogVisible.value = true
  dialogContent.value = JSON.stringify(toObject())
  // Message.info(JSON.stringify(toObject()))
}
const resetTransform = () => {
  elements.value = elementsDefault
  setTransform({ x: 0, y: 0, zoom: 1 })
}
const toggleclass = () =>
  elements.value.forEach(
    (el) => (el.class = el.class === 'node-light' ? 'node-dark' : 'node-light')
  )
</script>

<style lang="scss" scoped>
.vue-flow-content {
  height: 80vh;
  .node-light {
    background: none;
  }
  .node-dark {
    background: #eeeeee;
  }
}
.mt-4 {
  float: right;
  text-align: right;
  margin-bottom: 20px;
}
</style>
