<template>
    <v-md-editor
      v-model="text"
      placeholder="请使用markdown语法..."
      :height="height"
      @change="useText"
    ></v-md-editor>
  </template>
  
  <script>
  import { reactive, ref, toRefs } from "vue";
  export default {
    components: {},
    setup() {
      // 数据
      let text = ref(``);
      const options = reactive({ height: "400px" });
  
      // 方法
      function useText() {
        console.log("text:", text.value);
      }
      // 返回
      return {
        text,
        options,
        ...toRefs(options),
        useText,
      };
    },
  };
  </script>
  
  <style>
  </style>
  