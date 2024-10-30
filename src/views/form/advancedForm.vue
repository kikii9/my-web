<template>
  <el-card>
    <div class="card-title">添加input 🍯🍯🍯🍯🍯🍯</div>
    <el-input v-model="input1" placeholder="请输入域名">
      <template #prepend>Http://</template>
    </el-input>
    <el-input v-model="input1" placeholder="请输入..." class="mt10">
      <template #prepend>
        <el-select v-model="select" placeholder="" style="width: 115px">
          <el-option label="邮箱" value="1" />
          <el-option label="weixin" value="2" />
          <el-option label="Tel" value="3" />
        </el-select>
      </template>
    </el-input>
    <el-input v-model="input1" placeholder="请输入..." class="mt10">
      <template #append>.com</template>
    </el-input>
    <el-input v-model="input1" placeholder="请输入..." class="mt10">
      <template #prepend>
        <el-select v-model="select" placeholder="Select2" style="width: 115px">
          <el-option label="分类一" value="1" />
          <el-option label="分类二" value="2" />
          <el-option label="分类三" value="3" /> </el-select
      ></template>
      <template #append><el-button :icon="Search" /></template>
    </el-input>
    <el-input class="mt10" v-for="item in inputList" :key="item" :v-model="item" placeholder="请输入">
      <template #append><el-button @click="deleteHanle(item)">Delete</el-button></template>
    </el-input>
    <el-button icon="Plus" class="mt10 w100" @click="addInput()">添加</el-button>
  </el-card>
</template>

<script setup>
import { Search, Plus } from "@element-plus/icons-vue";
import { ref } from "vue";
const input1 = ref("");
const inputList = ref([]);
const select = ref("1");
const Select2 = ref("1");

const addInput = () => {
  inputList.value.push("");
};
const deleteHanle = (item) => {
  inputList.value.splice(inputList.value[item], 1);
};
</script>

<style lang="scss" scoped>
.card-title {
  padding-bottom: 20px;
  font-size: 18px;
  text-align: center;
}
</style>
