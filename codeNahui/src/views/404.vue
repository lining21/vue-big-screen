<template>
    <el-result title="抱歉，页面不存在" sub-title="Sorry, the page you visited does not exist.">
        <template #icon>
            <el-image :src="imgsrc" style="min-height: 28.5rem"/>
        </template>
        <template #extra>
            <el-button type="primary" @click="$router.push('/')">返回</el-button>
        </template>
    </el-result>
</template>

<script setup lang="ts">
import imgUrl from '@/assets/img/pub/404.png'
let imgsrc:string = imgUrl
</script>