<template>
  <el-card class="col-center">
    <div>视频播放器🍲🍲🍲🍲🍲🍲🍲</div>
    <div class="mt10 myVideo">
      <VideoJs :videoSrc="data.videoSrc" autoPlay />
    </div>
  </el-card>
</template>

<script setup>
import { reactive } from 'vue'
// //找到你的组件地址引入进来
import VideoJs from '../../components/VideoPlay.vue'
const data = reactive({
  videoSrc:
    'https://prod-streaming-video-msn-com.akamaized.net/178161a4-26a5-4f84-96d3-6acea1909a06/2213bcd0-7d15-4da0-a619-e32d522572c0.mp4',
})
</script>
<style lang="scss" scoped>
.myVideo {
  width: 50vw;
  height: auto;
}
</style>
