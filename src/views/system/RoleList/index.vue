<template>
  <el-card class="flx-row-right">
    <!-- <el-button type="primary" v-print="'#printMe'">打印</el-button> -->
    <el-button type="primary" @click="scrollHanlde">滑动加载</el-button>
    <el-button type="primary" @click="isShowPagHandle">分页加载</el-button>
    <el-button type="primary" @click="educeExcel">导出表格</el-button>
  </el-card>
  <el-card class="mt10" id="printMe">
    <el-table id="mutipleTable" :data="tableData" :header-cell-style="{ backgroundColor: '#ecf5ff' }" border stripe style="width: 100%" :height="heightTbale">
      <el-table-column v-for="item in columnData" :key="item.props" :sortable="item.sortable" :prop="item.props" :label="item.label" :width="item.width" :fixed="item.fixed" :align="item.align">
        <template v-slot:default="scope" v-if="item.props !== 'actions'">
          <el-input v-model="scope.row[item.props]" v-if="scope.row.itemEdit"></el-input>
          <div v-else class="one-cut-txt">{{ scope.row[item.props] }}</div>
        </template>
        <template v-slot:default="scope" v-if="item.props === 'actions'">
          <el-icon class="icon-edit" @click="itemEditHanld(scope.row)"><Finished v-if="scope.row.itemEdit" /><Edit v-else /></el-icon>
          <el-popconfirm confirm-button-text="确认" cancel-button-text="取消" :icon="InfoFilled" icon-color="#626AEF" title="确认删除该用户?" @confirm="DeleteItem(index)" @cancel="cancelEvent">
            <template #reference>
              <el-icon class="icon-dele"><Delete /></el-icon>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="isShowPag" small background layout="prev, pager, next" :total="60" class="mt-4 mt10" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </el-card>
</template>
<script setup>
import print from "vue3-print-nb";

import * as XLSX from "xlsx";
import { Edit, Delete, InfoFilled, View } from "@element-plus/icons-vue";
import { nextTick, onMounted, reactive, ref } from "vue";
import { orderLists } from "../../../api/modules/index.js";
import { options } from "./options.js";
const tableData = ref([]);
const oldTableData = ref([]);
const tabclickIndex = ref();

const columnData = ref(JSON.parse(JSON.stringify(options)));
const disabled = ref(false);
const dialogVisible = ref(false);
const total = ref(0);
const queryData = ref({
  keyWord: "",
  page: 1,
  size: 10,
});

const heightTbale = ref("auto");
const isShowPag = ref(true);
const scrollHanlde = () => {
  heightTbale.value = "75vh";
  isShowPag.value = false;
  oldTableData.value = [];
  queryData.value.page = 1;
  queryData.value.size = 15;
  initData();

  // let table = mutipleTable.value._value.layout.table.refs.bodyWrapper;
  let table = document.getElementById("mutipleTable");
  table.addEventListener(
    "scroll",
    (res) => {
      console.log("/监听表格滚动事件");
      loadmore(res);
    },
    true
  );
};
const isShowPagHandle = () => {
  isShowPag.value = true;
  heightTbale.value = "auto";
  queryData.value.page = 1;
  queryData.value.size = 10;
  initData();
};
const cancelEvent = (val) => {
  console.log("取消");
};
const initData = () => {
  orderLists(queryData.value).then((res) => {
    console.log(res.data.data);
    // total.value = res.data.data.total
    if (queryData.value.size == 10) {
      tableData.value = res.data.data;
    } else {
      tableData.value = res.data.data.slice(queryData.value.page - 1, queryData.value.size);
      oldTableData.value = res.data.data;
    }
  });
};
const itemEditHanld = (item) => {
  item.itemEdit = !item.itemEdit;
  // // console.log(JSON.stringify(item));
  // tabclickIndex.value = item;
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
  console.log("滑动加载");
};
const educeExcel = () => {
  console.log("导出表格");
  const data = XLSX.utils.json_to_sheet(tableData.value); //此处tableData.value为表格的数据
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, data, "test-data"); //test-data为自定义的sheet表名
  XLSX.writeFile(wb, "测试.xlsx"); //test.xlsx为自定义的文件名
};

// https://www.zcool.com.cn/work/ZMzUzMDA0MDQ=.html

onMounted(() => {
  console.log(columnData.value);
  initData();
});

const loadmore = (res) => {
  // 再距离底部20px的时候滚动加载下一条
  if (res.target.scrollTop && res.target.scrollHeight - 2 <= res.target.scrollTop + res.target.clientHeight) {
    console.log(queryData.value.page);
    queryData.value.page++;
    if (queryData.value.page > 5) return;
    tableData.value = tableData.value.concat(
      // res.data.data
      oldTableData.value.slice(queryData.value.size * queryData.value.page - queryData.value.size, queryData.value.size * queryData.value.page)
    );
  }
};
const vPrint = (event) => {
  event.print;
};
</script>

<style lang="scss" scoped>
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
</style>
