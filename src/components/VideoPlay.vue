<template>
  <div class="videoPlay">
    <video
      ref="m3u8_video"
      class="video-js vjs-default-skin vjs-big-play-centered"
      controls
    >
      <source :src="videoSrc" />
    </video>
  </div>
</template>
<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
const props = defineProps({
  videoSrc: String,
  autoPlay: Boolean,
})

const m3u8_video = ref()
let player
const initPlay = async () => {
  videojs.np('zh-CN', zh)
  await nextTick()
  const options = {
    muted: true,
    controls: true,
    autoplay: true,
    loop: true,
    language: 'zh-CN',
    techOrder: ['html5'],
  }
  player = videojs(m3u8_video.value, options, () => {
    videojs.log('播放器已经准备好了!')
    if (props.autoPlay && props.videoSrc) {
      player.play()
    }
    player.on('ended', () => {
      videojs.log('播放结束了!')
    })
    player.on('error', () => {
      videojs.log('播放器解析出错!')
    })
  })
}
onMounted(() => {
  initPlay()
})
//直接改变路径测试
watch(
  () => props.videoSrc,
  () => {
    player.pause()
    player.src(props.videoSrc)
    player.load()
    if (props.videoSrc) {
      player.play()
    }
  }
)
onBeforeUnmount(() => {
  player?.dispose()
})
</script>
<style lang="scss" scoped>
.videoPlay {
  width: 100%;
  height: 100%;
  .video-js {
    height: 100%;
    width: 100%;
    object-fit: fill;
  }
}

:deep(.vjs-tech) {
  object-fit: fill;
}
</style>
