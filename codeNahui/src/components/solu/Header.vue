<template>
  <div class="header-back relative">
    <div class="absolute title">{{title}}</div>
    <img src="@/assets/img/solu/head_back.png" alt="">
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    require: true,
    default: "标题"
  }
});
</script>

<style lang="less">
.header-back {
  display: flex;
  padding: 0 0 0 2rem;
  font-size: 18px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  color: #00FFF4;
  line-height: 25px;
  background: linear-gradient(180deg, #00FFF5 0%, #FFFFFF 100%);
  -webkit-background-clip: text;
  /* -webkit-text-fill-color: transparent; */
  img {
    height: 3rem;
    width: 24rem;
  }
  .title {
    bottom: 0.5rem;
    left: 4rem;
  }
}
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
</style>