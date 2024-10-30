<template>
  <el-card>
    <span class="box-card-title">拖拽🍻🍻🍻🍵🍵🍵</span>
    <div class="box-card-content">
      <div v-draggable class="drag-box flx-center text">我可以拖拽哦~</div>
      <div
        v-draggable
        class="drag-box flx-center text"
        style="background: #eba300; width: 200px; height: 200px"
      >
        我可以拖拽哦~
      </div>
    </div>
  </el-card>
</template>

<script setup></script>

<style lang="scss" scoped>
.box-card-title {
  padding: 10px;
  // display: block;
}
.box-card-content {
  width: 100%;
  height: 80vh;
  background-color: #fff;

  position: relative;
  .drag-box {
    position: absolute;
    top: 110px;
    width: 300px;
    height: 300px;
    color: #fff;
    background: #bad80a;
  }
}
</style>
