<template>
  <div class="energy-saving">
    <Header :title="title"></Header>
    <div class="cover flex justify-between">
      <div class="cover-item flex items-center" v-for="item in overviewList" :key="item.num">
        <div class="w-comb flex">
          <div class="w-comb-sub1">
            <div class="comb-shadow"></div>
          </div>
          <div class="w-comb-sub2">
            <div class="comb-shadow"></div>
          </div>
          <div class="img-class">
            <img style="height: 100%;width: 100%;" :src="imgRet(item.icon)"/>
          </div>
        </div>
        <!-- <div class="item-header"> 
          <img style="height: 100%;width: 100%;" :src="imgRet(item.icon)"/>
        </div> -->
        <div class="item-content flex flex-col items-start pl-5 ml-2">
          <div class="c-comb-sub1"></div>
          <div class="c-comb-sub2"></div>
          <div class="content-text pt-1">{{item.title}}</div>
          <div class="content-num">{{item.num}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from './Header.vue';
const props = defineProps({
  title: {
    type: String,
    require: true,
    default: "标题"
  },
  overviewList: {
    type: Array,
    require: true,
    default: () => [
      { title: '二氧化碳减排约（千克）', num: '339510618', icon: 'carbon_dioxide' },
      { title: '二氧化硫减排约（千克）', num: '1021597', icon: 'sulfur_dioxide' },
      { title: '节约标准煤约（千克）', num: '111694566', icon: 'coal' },
      { title: '等效植树约（棵）', num: '270215', icon: 'tree_planting' },
    ]
  },
});

const imgRet = (icon) => {
  return new URL(`../../assets/img/solu/${icon}.png`, import.meta.url).href
}
</script>

<style lang="less">
@import '@/assets/style/solution/style.less';
.energy-saving {
  height: 100%;
  .cover {
    height: 8rem;
    background: @item-background;
    box-shadow: @item-boxshadow;
    padding: 0 3rem;
    .w-comb {
      height: 3.4rem;
      width: 2rem;
      // background-color: #e4e4e4;
      display: inline-block;
      position: relative;
      // padding: 3px;
      border: 1px solid #00F1EC;
      border-left: 0px;
      border-right: 0px;
    }
    .img-class {
      height: 2rem;
      width: 2.6rem;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .comb-shadow {
      position: absolute;
      left: -20px;
      top: -20px;
      height: 10rem;
      width: 10rem;
      box-shadow: inset 0px 0px 9px 2px rgba(0,241,236,0.54);
    }
    .w-comb-sub1,
    .w-comb-sub2 {
      // background-color: #e4e4e4;
      position: absolute;
      width: inherit;
      height: inherit;
      // padding: 3px;
      border: 1px solid #00F1EC;
      border-left: 0px;
      border-right: 0px;
      overflow: hidden;
    }

    .w-comb-sub1 {
      transform: rotate(-60deg);
    }

    .w-comb-sub2 {
      transform: rotate(60deg);
    }
    .cover-item {
      .item-header {
        width: 3rem;
        height: 3rem;
        padding: 3px;
        box-shadow: inset 0px 0px 9px 2px rgba(0,241,236,0.54);
        border: 1px solid #00F1EC;
      }
      .item-content {
        position: relative;
        min-width: 9rem;
        height: 3.4rem;
        background: linear-gradient(270deg, rgba(0,241,236,0) 0%, rgba(0,241,236,0.14) 100%);
        border: 1px solid;
        border-left: 0px;
        border-right: 0px;
        border-image: linear-gradient(270deg, rgba(0, 241, 236, 0), rgba(0, 241, 236, 0.73)) 1 1;
        .content-text {
          font-size: 12px;
          font-weight: bold;
          color: rgba(255,255,255,0.64);
          -webkit-background-clip: text;
        }
        .content-num {
          font-size: 20px;
          font-weight: bold;
          color: rgba(255,255,255,0.87);
          background: linear-gradient(180deg, rgba(0,255,250,0.87) 0%, rgba(255,255,255,0.87) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .c-comb-sub1,
        .c-comb-sub2 {
          height: 3.4rem;
          width: 2rem;
          position: absolute;
          border: 1px solid #00F1EC;
          border-left: 0px;
          border-right: 0px;
          left: -2rem;
        }

        .c-comb-sub1 {
          border-top: 0px;
          transform: rotate(-60deg);
        }

        .c-comb-sub2 {
          border-bottom: 0px;
          transform: rotate(60deg);
        }
      }
    }
  }
}
</style>