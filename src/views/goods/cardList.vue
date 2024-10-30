<template>
  <el-card class="box-card" shadow="never"> 卡片列表 🍓🍇🍈🍉 </el-card>

  <el-row
    class="mt10"
    style="height: 75vh; overflow: auto"
    v-infinite-scroll="load"
  >
    <el-col :span="6" v-for="item in listData" :key="item" offset="1">
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
import { cardlists } from '../../api/modules/index.js'

import { onMounted, ref } from 'vue'
const listData = ref([])
const load = () => {
  cardlists().then((res) => {
    listData.value = listData.value.concat(res.data.data)
  })
  // count.value += 2
}

const getListData = () => {
  cardlists().then((res) => {
    listData.value = res.data.data
  })
}
onMounted(() => {
  getListData()
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
