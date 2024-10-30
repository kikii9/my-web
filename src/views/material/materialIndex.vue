<template>
  <el-row style="height: 90vh">
    <el-col :span="6" style="border-right: 10px solid #f0f2f5">
      <div class="material-header flx-row">
        <div class="tit">目录</div>
        <div>
          <el-icon><MoreFilled /></el-icon>
        </div>
      </div>
    </el-col>
    <el-col :span="18">
      <div class="material-header flx-row">
        <div class="tit">我的文件</div>
        <div>
          <el-icon><MoreFilled /></el-icon>
        </div>
      </div>
      <div class="material-content">
        <div class="flx-row">
          <div class="item"></div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
@import "./index.scss";
</style>
