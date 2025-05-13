<script setup lang="ts">
	import Skeleton from '@/components/skeleton.vue'
</script>

<template>
	<Skeleton v-if="!$LOADED"/>
    <keep-alive v-if="$route.meta.keepAlive">
        <router-view />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
</template>

<style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    line-height: 1.5;
}

#app {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #333;
}
</style>
