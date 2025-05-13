<template>
  <div class="header-back relative">
    <!-- <div class="absolute title">{{title}}</div> -->
    <div class="absolute title" :style="titleStyle">{{title}}</div>
    <img :src="backImg" :style="`width: ${imgWidth}`"/>
  </div>
</template>

<script setup>
import i18nConstant from '@/i18n/i18nConstant.js';
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const i18n = useI18n();
const isEn = computed(() => i18n.locale.value === i18nConstant.EN)

const props = defineProps({
  title: {
    type: String,
    require: true,
    default: "标题"
  },
  headerBack: {
    type: String,
    require: true,
    default: 'head_back'
  },
  imgWidth: {
    type: String,
    require: true,
    default: '24rem'
  }
});
const backImg = computed(() => {
  return new URL(`../../assets/img/solu/${props.headerBack}.png`, import.meta.url).href
})

const titleStyle = computed(() => {
  switch (i18n.locale.value) {
    case i18nConstant.CN:
      return {}
    case i18nConstant.EN:
      return { 'font-size': '16px' }
    default:
      return {}
  }
})
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