<template>
    <div class="flex-column-center-center">
        <h2>欢迎访问<br>{{ $BASENAME }}<br>综合大屏</h2>
        <el-image src="https://cdn01.rrsjk.com/images/96958cc1-1a88-4b2c-91d8-c4f6aec32f36.png" style="margin: 1rem;width: 18rem;height: auto;" />
        <router-link to="/apv">{{ $BASENAME }}智慧大屏</router-link>
    </div>
</template>

<style lang='less' scoped>
div {
    width: 100%;
    height: 100vh;
}
</style>