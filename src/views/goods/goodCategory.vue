<template>
  <el-card class="box-card" shadow="never"> 基础列表 🍓🍇🍈🍉 </el-card>

  <div v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
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
    <!-- <div v-for="i in listData" :key="i" class="infinite-list-item">
        <div class="infinite-list-item-top">
          {{ i.title }}
        </div>
        <div class="infinite-list-item-main flx-row">
          <div style="flex: 1">创建人：{{ i.createUser }}</div>
          <div style="flex: 1">发布时间：{{ i.createTime }}</div>
        </div>
      </div>-->
  </div>
</template>

<script setup>
import { Newslist } from '../../api/modules/index.js'

import { onMounted, ref } from 'vue'
const listData = ref([])
const load = () => {
  Newslist().then((res) => {
    listData.value = listData.value.concat(res.data.data)
  })
  // count.value += 2
}

const getListData = () => {
  Newslist().then((res) => {
    listData.value = res.data.data
  })
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
