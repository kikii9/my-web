<template>
    <h1>测试一下</h1>
    <parent>
    <el-input placeholder="请输入"></el-input>
    </parent>
</template>

<script>
import parent from './parents.vue'
import son from './son.vue'
export default {
    name: 'index',
    components: {
        'parent': parent,
        'son': son
    }
}
</script>

<style></style>