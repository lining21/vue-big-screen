<template>
  <div class="middle-gif">
    <div class="cover flex flex-col items-center">
      <div class="w-full" style="height: 85%;">
        <!-- <img src="/src/assets/img/solu/middle.gif" /> -->
        <video muted autoplay="autoplay" loop="loop">
          <source src="/video/middle.mp4" />
        </video>
      </div>
      <div class="h-full flex jusfify-center">
        <LeftRightSwiperScroll style="width: 50rem;">
          <span class="list-btn" v-for="(item, index) in overviewList" :key="index">
            {{ item.title }}
          </span>
        </LeftRightSwiperScroll>
      </div>
    </div>
  </div>
</template>

<script setup>
import LeftRightSwiperScroll from '@/components/solu/LeftRightSwiperScroll.vue'
const props = defineProps({
  overviewList: {
    type: Array,
    require: true,
    default: () => [
      { title: '户用屋顶', num: '4200', unitr: '', icon: '#05CFF7', color: '#05CFF7', unit: '42%' },
      { title: '户用阳光房', num: '3000', unitr: '+', icon: '#1978E5', color: '#1978E5', unit: '31%' },
      { title: '户用院落', num: '1000', unitr: '+', icon: '#EAB966', color: '#EAB966', unit: '10%' },
      { title: '公共建筑', num: '200', unitr: '+', icon: '#60B45E', color: '#60B45E', unit: '3%' },
      { title: '农光互补', num: '1000', unitr: '+', icon: '#BECDD0', color: '#BECDD0', unit: '10%' },
      { title: '渔光互补', num: '300', unitr: '+', icon: '#AD7EC5', color: '#BECDD0', unit: '4%' },
      { title: '林业互补', num: '200', unitr: '+', icon: '#60B45E', color: '#60B45E', unit: '3%' },
      { title: '工商业', num: '1000', unitr: '+', icon: '#BECDD0', color: '#BECDD0', unit: '10%' },
      { title: 'BIPV', num: '300', unitr: '+', icon: '#AD7EC5', color: '#BECDD0', unit: '4%' },
      { title: '户用屋顶', num: '4200', unitr: '', icon: '#05CFF7', color: '#05CFF7', unit: '42%' },
      { title: '户用阳光房', num: '3000', unitr: '+', icon: '#1978E5', color: '#1978E5', unit: '31%' },
      { title: '户用院落', num: '1000', unitr: '+', icon: '#EAB966', color: '#EAB966', unit: '10%' },
      { title: '公共建筑', num: '200', unitr: '+', icon: '#60B45E', color: '#60B45E', unit: '3%' },
      { title: '农光互补', num: '1000', unitr: '+', icon: '#BECDD0', color: '#BECDD0', unit: '10%' },
    ]
  },
});

</script>

<style lang="less">
@import '@/assets/style/solution/style.less';
.middle-gif {
  // height: 100%;
  .cover {
    height: 40rem;
    background: @item-background;
    box-shadow: @item-boxshadow;
    img {
      height: 100%;
      width: 100%;
    }
    video {
      height: 100%;
      width: 100%;
    }
  }
  @keyframes animated-border {
    0% {
      box-shadow: 0 0 0 0 rgba(255,255,255,0.4);
    }
    100% {
      // box-shadow: 0px 0px 0px 2px rgba(255,255,255,0);
      outline: 5px solid rgba(255,255,255,0);
      outline-offset: -5px;
    }
  }
  .list-btn {
    // background: red;
    padding: 10px 20px;
    margin: 0 11px;
    color: #6DFFFF;
    border-radius: 20px;
    animation: animated-border 1.5s infinite;
    font-family: Arial;
    font-size: 18px;
    line-height: 30px;
    font-weight: bold;
    // border: 1px solid #00bcd4
  }
}
</style>