<template>
  <el-card shadow="never" class="henader-card">
    <div class="flx-row">
      <el-form :inline="true" :model="queryData" style="flex: 1">
        <el-input placeholder="请输入搜索内容" v-model="queryData.keyWord">
        </el-input>
        <el-date-picker
          class="ml20"
          v-model="queryData.date"
          type="datetimerange"
          :shortcuts="shortcuts"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form>
      <div class="flex-right">
        <el-button type="primary" :icon="Search" @click="initData" class="ml20"
          >搜索</el-button
        >
        <el-button type="primary" @click="dialogVisibleShow">+添加</el-button>
      </div>
    </div>
  </el-card>
  <el-card shadow="never">
    <el-table
      :data="tableData"
      :header-cell-style="{ backgroundColor: '#ecf5ff' }"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column
        v-for="item in options"
        :key="item.type"
        :prop="item.props"
        :label="item.label"
        :width="item.width"
        :align="item.align"
        show-overflow-tooltip
        :fixed="item.fixed"
      >
        <template v-slot:default="scope" v-if="item.props === 'actions'">
          <el-icon class="icon-view" @click="ItemView(scope.row)"
            ><View
          /></el-icon>
          <el-icon class="icon-edit" @click="editorClick(scope.row)"
            ><Edit
          /></el-icon>
          <el-popconfirm
            confirm-button-text="确认"
            cancel-button-text="取消"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="确认删除该用户?"
            @confirm="DeleteItem(index)"
          >
            <template #reference>
              <el-icon class="icon-dele"><Delete /></el-icon>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      background
      :page-size="queryData.size"
      layout="prev, pager, next"
      :total="total"
      class="mt-4"
      @current-change="handleCurrentChange"
    />
  </el-card>

  <el-dialog
    v-model="dialogVisible"
    :title="`${dialogData.title}用户`"
    :width="dialogWidth"
    :hide-required-asterisk="dialogData.isView"
    draggable
  >
    <el-form
      :model="dialogData.FormData"
      :rules="rules"
      ref="FormRef"
      class="demo-ruleForm"
    >
      <el-form-item
        label="用户名"
        :label-width="formLabelWidth"
        prop="username"
      >
        <el-input v-model="dialogData.FormData.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="dialogData.FormData.email" autocomplete="off" />
      </el-form-item>

      <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
        <el-input v-model="dialogData.FormData.address" type="textarea" />
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth" prop="content">
        <el-input v-model="dialogData.FormData.content" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit()">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {
  Search,
  Edit,
  Delete,
  UserFilled,
  InfoFilled,
  View,
} from '@element-plus/icons-vue'
import {
  getUserList,
  addUserList,
  listUpdate,
} from '../../../api/modules/index.js'
import { options } from './options.js'
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { getDateTime } from '../../../utils/index.js'
const queryData = ref({
  keyWord: '',
  page: 1,
  size: 10,
})
const FormRef = ref()
const formLabelWidth = '140px'
const dialogData = reactive({
  isView: true,
  title: '添加',
  FormData: {
    username: '',
    email: '',
    address: '',
    content: '',
  },
})

const dialogWidth = ref('0')
const rules = reactive({
  username: [{ required: true, message: '请填写用户姓名', trigger: 'change' }],
  email: [{ required: true, message: '请填写邮箱', trigger: 'change' }],
  address: [{ required: true, message: '请填写居住地址', trigger: 'change' }],
  content: [{ required: true, message: '请填写备注信息', trigger: 'change' }],
})
const oldTableData = ref([])
const dialogVisible = ref(false)
const tableData = ref([])
const total = ref(0)

const initData = () => {
  getUserList(queryData.value).then((res) => {
    total.value = res.data.data.total
    tableData.value = res.data.data.userList
  })
}

const dialogVisibleShow = () => {
  dialogData.FormData = {
    username: '',
    email: '',
    address: '',
    content: '',
  }
  dialogVisible.value = true
}
const onSubmit = () => {
  FormRef.value.validate(async (valid) => {
    if (!valid) return
    try {
      if (dialogData.FormData.id) {
        listUpdate(dialogData.FormData).then((res) => {
          console.log('编辑数据成功')
          console.log(ElMessage)
          ElMessage({
            message: '编辑用户成功',
            type: 'success',
          })
          tableData.value = res.data.data
        })
      } else {
        dialogData.FormData.date = getDateTime('')
        addUserList(dialogData.FormData)
          .then((res) => {
            ElMessage({
              message: '添加用户成功',
              type: 'success',
            })
            dialogData.FormData.id = res.data.data.id
            tableData.value.unshift(dialogData.FormData)
          })
          .catch((err) => {})
      }
      dialogVisible.value = false
    } catch (error) {
      console.log(error)
    }
  })
}
const handleCurrentChange = (val) => {
  queryData.value.page = val
  initData(queryData.value)
}
const editorClick = (item) => {
  dialogVisible.value = true

  dialogData.FormData = item
  console.log(dialogData.FormData)
  dialogData.isView = false
  dialogData.title = '编辑'
}

const ItemView = (item) => {
  dialogVisible.value = true
  dialogData.FormData = item
  dialogData.isView = false
  dialogData.title = ''
}

const DeleteItem = (index) => {
  console.log(index)
  tableData.value.splice(index, 1)
}
const cancelEvent = () => {
  console.log('cancel!')
}
const setDialogWidth = () => {
  console.log(document.body.clientWidth)
  var val = document.body.clientWidth
  const def = 800 // 默认宽度
  if (val < def) {
    dialogWidth.value = '100%'
  } else {
    dialogWidth.value = def + 'px'
  }
}
onMounted(() => {
  setDialogWidth()
  window.onresize = () => {
    return (() => {
      setDialogWidth()
    })()
  }
  initData()
})
</script>

<style lang="scss" scoped>
.henader-card {
  margin-bottom: 20px;
}
.icon-view {
  font-size: 20px;
  color: #673ab7;
  margin: 0 10px;
}
.icon-edit {
  font-size: 20px;
  color: #2f60c2;
  margin: 0 10px;
}
.icon-dele {
  font-size: 20px;
  color: #ff5722;
}
.mt-4 {
  float: right;
  text-align: right;
  margin-top: 20px;
  margin-bottom: 20px;
}
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
