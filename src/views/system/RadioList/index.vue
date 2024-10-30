<template>
  <el-card class="mt10">
    <h5>获取勾选的表格数据，实现分页多选功能</h5>

    <el-table
      ref="tableRef"
      :data="tableData"
      :header-cell-style="{ backgroundColor: '#ecf5ff' }"
      border
      stripe
      style="width: 100%"
      :row-key="getRowKey"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        :reserve-selection="true"
      ></el-table-column>
      <el-table-column
        v-for="item in columnData"
        :key="item.props"
        :prop="item.props"
        :label="item.label"
        :width="item.width"
        v-show="item.show"
        :fixed="item.fixed"
        :align="item.align"
        show-overflow-tooltip
      ></el-table-column>
    </el-table>
    <el-pagination
      class="mt10 mt-4"
      v-model:currentPage="queryData.page"
      v-model:page-size="queryData.size"
      :page-sizes="[10]"
      :disabled="disabled"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <h6>勾选数据</h6>
    <el-button type="primary" size="default" @click="reset()"
      >清空数据</el-button
    >

    <ul>
      <li v-for="(item, index) in selection" :key="item">
        {{ index }}
        -------
        {{ item }}
      </li>
    </ul>
  </el-card>
</template>
<script setup>
import { nextTick, onMounted, reactive, ref } from "vue";
import { getUserList } from "../../../api/modules/index.js";
import { options } from "./options.js";
import Sortable from "sortablejs";
const tableData = ref([]);
const id = ref("");
const tableDialog = ref([]);
const optionsType = ref([
  { value: "left", label: "右对齐" },
  { value: "right", label: "左对齐" },
  { value: "center", label: "居中" },
]);
const fiexdType = ref([
  { value: true, label: "是" },
  { value: false, label: "否" },
]);
const DialogColumn = ref([
  {
    label: "表头",
    props: "label",
  },
  {
    label: "对应列的宽度",
    props: "width",
  },
  {
    label: "对齐方式",
    props: "align",
  },
  {
    label: "是否显示",
    props: "show",
  },
  {
    label: "列是否固定",
    props: "fiexd",
  },
]);

const columnData = ref(JSON.parse(JSON.stringify(options)));
const disabled = ref(false);
const dialogVisible = ref(false);
const total = ref(0);
const temp = ref([]);
const queryData = ref({
  keyWord: "",
  page: 1,
  size: 10,
});

const tableRef = ref();
const reset = (rows) => {
  if (rows) {
    rows.forEach((row) => {
      // TODO: improvement typing when refactor table
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      tableRef.value.toggleRowSelection(row, undefined);
    });
  } else {
    tableRef.value.clearSelection();
  }
};
const selection = ref([]);
const selectCopyRow = ref([]);
const handleSelectionChange = (val) => {
  selection.value = val;

  const tableSelection = val; // 勾选的数据

  // 控制单选
  if (tableSelection.length > 1) {
    const del_row = tableSelection.shift();
    tableRef.value.toggleRowSelection(del_row, false);

    selectCopyRow.value = tableSelection[0];
  } else {
    selectCopyRow.value = tableSelection[0];
  }
};

const getCheckedData = () => {};
const getRowKey = (row) => {
  return row.username;
};
const initData = () => {
  getUserList(queryData.value).then((res) => {
    total.value = res.data.data.total;
    tableData.value = res.data.data.userList;
  });
};
const handleSizeChange = (val) => {
  console.log(val);
};

const handleCurrentChange = (val) => {
  queryData.value.page = val;
  initData(queryData.value);
};
const handleClose = () => {};
const dialogVisibleHanle = () => {
  console.log(tableData.value);
  console.log(columnData);
  tableDialog.value = columnData.value;
  console.log(tableDialog.value);
  dialogVisible.value = true;
  nextTick(() => {
    initSortable("t1");
  });
};

const dialogSubmit = () => {
  console.log(tableDialog.value);
  dialogVisible.value = false;
  console.log(columnData.value);
};
onMounted(() => {
  console.log(columnData.value);
  initData();
});

const initSortable = (className) => {
  console.log(className);
  // 获取表格row的父节点
  const table = document.querySelector(
    "." + className + " .el-table__body-wrapper tbody"
  );
  // 创建拖拽实例
  console.log(table);
  console.log(Sortable);
  let dragTable = Sortable.create(table, {
    animation: 150, //动画
    // disabled: false, // 拖拽不可用? false 启用（刚刚渲染表格的时候起作用，后面不起作用）
    // handle: ".move", //指定拖拽目标，点击此目标才可拖拽元素(此例中设置操作按钮拖拽)
    // filter: ".disabled", //指定不可拖动的类名（el-table中可通过row-class-name设置行的class）
    // dragClass: "dragClass", //设置拖拽样式类名
    // ghostClass: "ghostClass", //设置拖拽停靠样式类名
    // chosenClass: "chosenClass", //设置选中样式类名
    // 开始拖动事件
    onStart: () => {
      console.log("开始拖动");
    },
    // 结束拖动事件
    onEnd: ({ newIndex, oldIndex }) => {
      console.log("结束拖动", `拖动前索引${oldIndex}---拖动后索引${newIndex}`);
      const currRow = tableDialog.value.splice(oldIndex, 1)[0];
      tableDialog.value.splice(newIndex, 0, currRow);
      console.log("结束拖动", tableDialog.value);
    },
  });
};

function tableRowClassName({ row }) {
  if (row.disabled) {
    return "disabled";
  }
  return "";
}
</script>

<style lang="scss" scoped>


::v-deep .el-table__header .el-checkbox {
  display: none;
}
.mt-4 {
  float: right;
  text-align: right;
  margin-bottom: 20px;
}

.dragClass {
  background: rgba($color: #41c21a, $alpha: 0.5) !important;
}
// 停靠
.ghostClass {
  background: rgba($color: #6cacf5, $alpha: 0.5) !important;
}
// 选择
.chosenClass:hover > td {
  background: rgba($color: #f56c6c, $alpha: 0.5) !important;
}
</style>
