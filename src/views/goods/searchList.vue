<template>
  <el-card class="box-card" shadow="never">
    <div class="flx-row">
      搜索列表 🍓🍇🍈🍉
      <el-input
        type="text"
        placeholder="请输入关键字..."
        style="width: 300px; margin-left: 10px"
        v-model="searchValue"
      >
        <template #append>
          <el-button type="primary" :icon="Search" />
        </template>
      </el-input>
      <div style="flex: 1"></div>
      <div class="img" @click="checkList('1001')">
        <svg
          t="1663432921802"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4971"
          data-spm-anchor-id="a313x.7781069.0.i30"
          width="20"
          height="20"
          :fill="colorType == '1001' ? '#1250FC' : '#888888'"
        >
          <path
            d="M849.1 128 174.9 128c-25.9 0-46.9 21-46.9 46.9l0 34.2c0 25.9 21 46.9 46.9 46.9l674.2 0c25.9 0 46.9-21 46.9-46.9l0-34.2C896 149 875 128 849.1 128z"
            p-id="4972"
          ></path>
          <path
            d="M849.1 768 174.9 768c-25.9 0-46.9 21-46.9 46.9l0 34.2c0 25.9 21 46.9 46.9 46.9l674.2 0c25.9 0 46.9-21 46.9-46.9l0-34.2C896 789 875 768 849.1 768z"
            p-id="4973"
          ></path>
          <path
            d="M849.1 448 174.9 448c-25.9 0-46.9 21-46.9 46.9l0 34.2c0 25.9 21 46.9 46.9 46.9l674.2 0c25.9 0 46.9-21 46.9-46.9l0-34.2C896 469 875 448 849.1 448z"
            p-id="4974"
          ></path>
        </svg>
      </div>
      <div class="img" @click="checkList('1002')">
        <svg
          t="1663433235072"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5148"
          width="23"
          height="23"
          :fill="colorType == '1002' ? '#1250FC' : '#888888'"
        >
          <path
            d="M433.1 480 174.9 480c-25.9 0-46.9-21-46.9-46.9L128 174.9c0-25.9 21-46.9 46.9-46.9l258.2 0c25.9 0 46.9 21 46.9 46.9l0 258.2C480 459 459 480 433.1 480z"
            p-id="5149"
          ></path>
          <path
            d="M433.1 896 174.9 896c-25.9 0-46.9-21-46.9-46.9L128 590.9c0-25.9 21-46.9 46.9-46.9l258.2 0c25.9 0 46.9 21 46.9 46.9l0 258.2C480 875 459 896 433.1 896z"
            p-id="5150"
          ></path>
          <path
            d="M849.1 480 590.9 480c-25.9 0-46.9-21-46.9-46.9L544 174.9c0-25.9 21-46.9 46.9-46.9l258.2 0c25.9 0 46.9 21 46.9 46.9l0 258.2C896 459 875 480 849.1 480z"
            p-id="5151"
          ></path>
          <path
            d="M849.1 896 590.9 896c-25.9 0-46.9-21-46.9-46.9L544 590.9c0-25.9 21-46.9 46.9-46.9l258.2 0c25.9 0 46.9 21 46.9 46.9l0 258.2C896 875 875 896 849.1 896z"
            p-id="5152"
          ></path>
        </svg>
      </div>
    </div>
  </el-card>

  <div
    v-infinite-scroll="load"
    class="infinite-list"
    style="overflow: auto"
    v-if="colorType == 1001"
  >
    <div class="barlist flx-row" v-for="i in listData" :key="i">
      <div class="item-img">
        <img src="../../assets/images/avart.jpg" alt="" />
      </div>
      <div class="item-left">
        <div class="name">{{ i.createUser }}</div>
        <div class="subname">{{ i.email }}</div>
      </div>
      <div class="item-left">
        <div class="name">{{ i.title }}</div>
        <div class="subname">{{ i.createTime }}发票已发出</div>
      </div>
      <div class="item-right">{{ i.number }}</div>
      <div
        class="item-state flx-row"
        :style="{
          backgroundColor:
            i.pay_state == '1002'
              ? '#6C88D5'
              : i.pay_state == '1003'
              ? '#fa4a1e'
              : '#00AA5A',
        }"
      >
        <span>{{
          i.pay_state == '1001'
            ? '已支付'
            : i.pay_state == '1002'
            ? '待支付'
            : '未支付'
        }}</span>
      </div>
    </div>
  </div>

  <el-row
    class="mt10"
    style="height: 75vh; overflow: auto"
    v-infinite-scroll="load"
    v-if="colorType == 1002"
  >
    <el-col :span="6" v-for="item in cardlist" :key="item" offset="1">
      <el-card shadow="hover" class="card-lists">
        <!-- <div
          class="item-state-pos"
          :style="{
            backgroundColor:
              item.pay_state == '1002'
                ? '#6C88D5'
                : item.pay_state == '1003'
                ? '#fa4a1e'
                : '#00AA5A',
          }"
        >
          {{
            item.pay_state == '1001'
              ? '已支付'
              : item.pay_state == '1002'
              ? '待支付'
              : '未支付'
          }}
        </div> -->
        <div class="item-state-pos">
          <el-icon><MoreFilled /></el-icon>
        </div>
        <div class="item-title">
          <img src="../../assets/images/avart.jpg" alt="" />{{ item.title }}
        </div>
        <div class="item-content flx-row">
          <div class="cot">
            <div class="cot-tit">发行日期</div>
            <div class="cot-txt">{{ item.date }}</div>
          </div>
          <div class="cot">
            <div class="cot-tit">客户姓名</div>
            <div class="cot-txt">{{ item.user_name }}</div>
          </div>
        </div>
        <div class="item-content flx-row">
          <div class="cot">
            <div class="cot-tit">
              金额 <span>{{ item.number }}</span>
            </div>
          </div>
          <div class="cot">
            <div class="cot-tit">
              状态
              <span
                :class="[
                  item.pay_state == '1002'
                    ? 'type suc-type'
                    : item.pay_state == '1003'
                    ? 'type'
                    : 'type error-type',
                ]"
                >{{
                  item.pay_state == '1001'
                    ? '已支付'
                    : item.pay_state == '1002'
                    ? '待支付'
                    : '未支付'
                }}</span
              >
            </div>
          </div>
        </div>
        <div class="item-content flx-row">
          <div class="cot">
            <div class="cot-tit">详情</div>
            <div class="cot-txt one-cut-txt">{{ item.content }}</div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { Newslist, cardlists } from '../../api/modules/index.js'

import { Search, Plus } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'

const listData = ref([])
const cardlist = ref([])
const searchValue = ref('')
const colorType = ref('1001')
const load = () => {
  if (colorType == '1002') {
    cardlists().then((res) => {
      cardlist.value = res.data.data
    })
  } else {
    Newslist().then((res) => {
      listData.value = listData.value.concat(res.data.data)
    })
  }
  // count.value += 2
}

const getListData = () => {
  Newslist().then((res) => {
    listData.value = res.data.data
  })
  cardlists().then((res) => {
    cardlist.value = res.data.data
  })
}

const checkList = (type) => {
  colorType.value = type
  if (type == 1001) {
    ElMessage({
      message: '单列展示，切换成功！',
      type: 'success',
    })
  } else {
    ElMessage({
      message: '多列展示，切换成功！',
      type: 'success',
    })
  }
}
onMounted(() => {
  getListData()
})
</script>

<style lang="scss" scoped>
.box-card {
  width: 100%;
  .box-card-title {
    margin-bottom: 20px;
  }
}
@import './index.scss';
</style>
