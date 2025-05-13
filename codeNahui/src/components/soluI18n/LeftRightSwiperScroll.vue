<template>
  <div class="main">
    <!-- 左边按钮 -->
    <div @click="handleLeftClick" class="scroll-icon left-icon">
      <img src="/src/assets/img/solu/icon-arrow-left.png" alt="">
    </div>
    <!-- 文本超出，左右按钮滚动 -->
    <div ref="swiperScroll" class="left-right-swiper-scroll-box">
      <!-- 中间滚动区域 -->
      <div ref="swiperScrollContent" class="swiper-scroll-content" :style="scrollStyle">
        <slot></slot>
      </div>
    </div>
    <!-- 左边按钮 -->
    <div @click="handleRightClick" class="scroll-icon right-icon">
      <img src="/src/assets/img/solu/icon-arrow-right.png" alt="">
    </div>
  </div>
</template>
  
<script>
import i18nConstant from '@/i18n/i18nConstant.js';
  export default {
    name: 'leftRightSwiperScroll',
    props: {
      swiperList: {
        type: Object,
        default: () => {
          return {};
        }
      },
      i18nLocal: {
        type: String,
        default: i18nConstant.CN
      }
    },
    data() {
      return {
        showRightIcon: false, // 是否显示右箭头
        swiperScrollWidth: 0, // 盒子的宽度
        swiperScrollContentWidth: 0, // 内容的宽度
        maxClickNum: 0, // 最大点击次数
        lastLeft: 0, // 上次滑动距离
        clickNum: 0, // 点击次数
        childrenList: [] // 传进来的子元素
      }
    },
    computed: {
      showLeftIcon() {
        return this.clickNum > 0
      },
      scrollStyle() {
        console.log('i18nLocal--->', this.i18nLocal);
        switch (this.i18nLocal) {
          case i18nConstant.CN:
            return { animation: 'roll 25s infinite linear' }
          case i18nConstant.EN:
            return { animation: 'rollI18n 35s infinite linear' }
          default:
            return { animation: 'roll 25s infinite linear' }
        }
      },
    },
    mounted() {
      // 获取 HTMLCollection 转为 数组
      this.childrenList = [...this.$refs.swiperScrollContent.children];
      console.log('childrenList--->', this.childrenList);            
      console.log('swiperScroll--->', this.$refs.swiperScroll.getBoundingClientRect());
      console.log('swiperScrollContent--->', this.$refs.swiperScrollContent.getBoundingClientRect());
      // 盒子的宽度
      this.swiperScrollWidth = this.$refs.swiperScroll.getBoundingClientRect().width;
      // 内容的宽度
      this.swiperScrollContentWidth = this.$refs.swiperScrollContent.getBoundingClientRect().width;
      // 比较盒子的宽度,跟内容的宽度：判断是否需要展示右边的按钮
      if(this.swiperScrollWidth < this.swiperScrollContentWidth) {
        this.showRightIcon = true;
      }
    },
    methods: {
      // 点击右箭头（左侧滚动）
      handleRightClick() {
        // 如果点击次数小于数组长度-1时，执行左滑动效果。
        if (this.clickNum < this.childrenList.length - 1) {
          // 获取当前元素宽度
          let width = this.childrenList[this.clickNum].getBoundingClientRect().width;
          console.log(this.childrenList[this.clickNum], this.childrenList[this.clickNum].getBoundingClientRect());
          // 获取最后一个元素距离左侧的距离
          let lastItemOffsetLeft = this.childrenList[this.childrenList.length - 1].offsetLeft;
          // 获取最后一个元素宽度
          let lastWidth = this.childrenList[this.childrenList.length - 1].getBoundingClientRect().width;
          console.log('lastItemOffsetLeft-->', lastItemOffsetLeft, this.childrenList[this.childrenList.length - 1].getBoundingClientRect());
          // 获取可视区域宽度
          const lookWidth = this.$refs.swiperScroll.clientWidth;
          console.log('获取可视区域宽度-->lookWidth', lookWidth);
          // 如果最后一个元素距离左侧的距离+自身的宽度大于可视距离，表示最后一个元素没有出现，执行滚动效果
          if (lastItemOffsetLeft + lastWidth > lookWidth) {
            // 滚动距离（元素的magin-left值） = 负的它自己的长度 + 上一次滑动的距离
            this.$refs.swiperScrollContent.style.marginLeft = `${-width + this.lastLeft}px`;
            this.lastLeft = -width + this.lastLeft;
            // 点击次数+1
            this.clickNum++;
            // 记录到最后一个元素出现在可视区域时，点击次数的最大值。用于后面点击左侧箭头时判断右侧箭头的显示
            this.maxClickNum = this.clickNum;
          }
          // 如果最后一个元素距离左侧的距离小于于可视距离，需要隐藏右侧箭头
          let timer = setTimeout(() => {
            // 重新：获取最后一个元素距离左侧的距离
            let lastItemOffsetLeft2 = this.childrenList[this.childrenList.length - 1].offsetLeft;
            console.log('lastItemOffsetLeft2-新的->', lastItemOffsetLeft2);
            if(lastItemOffsetLeft2 + lastWidth <= lookWidth) {
              this.showRightIcon = false;
            }
            clearTimeout(timer);
          }, 200);
        }
      },
      // 点击左箭头（右侧滚动）
      handleLeftClick() {
        // 当点击次数大于0时才触发，这样当点击次数clickNum等于1的到时候，clickNum--等于0.根据计算属性的判断会隐藏掉左箭头
        if (this.clickNum > 0) {
          // 获取当前元素宽度
          let width = this.childrenList[this.clickNum - 1].getBoundingClientRect().width;
          // 公示：滚动距离（元素的magin-left值） = 它自己的长度 + 上一次滑动的距离
          this.$refs.swiperScrollContent.style.marginLeft = `${this.lastLeft + width}px`
          this.lastLeft = width + this.lastLeft;
          // 点击次数-1
          this.clickNum--;
          // 如果点击次数小于最大点击次数，说明最后一个元素已经不在可是区域内了，显示右箭头
          if (this.clickNum < this.maxClickNum) {
            this.showRightIcon = true;
          }
        }
      }
    }
  }
  </script>
  
  <style lang='less'>
  .main {
    display:flex;
    align-items:center;
    .scroll-icon {
      width: 30px;
      height: 40px;
      cursor: pointer;
      background-image: linear-gradient(270deg, invalid gradient);
      &.right-icon {
        margin: 0 0 0 26px;
      }
      &.left-icon {
        margin: 0 26px 0 0;
      }
    }
    .left-right-swiper-scroll-box {
      // position: relative;
      width: 100%;
      overflow: hidden;
      transition: all 0.3s;
      // transform: translateY(-50%);
      // top: 50%;
      .swiper-scroll-content {
        display: flex;
        align-items: center;
        white-space: nowrap;
        width: 90%;
        // transition: all 0.3s;
        animation: roll 25s infinite linear;
      }
    }
    @keyframes roll {
      0% {
        transform: translateX(0%);
      }
      100% {
        transform: translateX(-188%);
      }
    }
    @keyframes rollI18n {
      0% {
        transform: translateX(0%);
      }
      100% {
        transform: translateX(-350%);
      }
    }
  }
  </style>
  