<template>
  <div class="energy-storage">
    <Header :title="title"></Header>
    <div class="flex justify-between cover" style="padding: 0.5rem 1.8rem;">
      <div class="cover-item flex flex-col items-center" v-for="item in overviewListI18n" :key="item.subNum">
        <div class="item-back" :style="itemPadding">
          <div class="angle angle-left-top"></div>
          <div class="angle angle-left-bottom"></div>
          <div class="angle angle-right-top"></div>
          <div class="angle angle-right-bottom"></div>
          <div class="flex items-base justify-center">
            <div class="cover-num">{{item.num}}</div>
            <div class="cover-unit">{{item.unit}}</div>
          </div>
          <div class="cover-title">
            {{item.title}}
          </div>
        </div>
        <div v-if="item.subTitle" class="flex flex-col items-center">
          <div class="cover-sub-title mt-4" :style="subTitleStyle">
            {{item.subTitle}}
          </div>
          <div class="image relative pb-2">
            <img style="height: 100%;width: 100%;" :src="imgRet(item.icon)"/>
            <div class="flex items-base justify-center absolute sub">
              <div class="cover-sub-num">{{item.subNum}}</div>
              <div class="cover-unit">{{item.subUnit}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from './Header.vue';
import i18nConstant from '@/i18n/i18nConstant.js';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n'
const i18n = useI18n();
const isZh = computed(() => i18n.locale.value === i18nConstant.CN)
const props = defineProps({
  title: {
    type: String,
    require: true,
    default: "标题"
  },
  // overviewList: {
  //   type: Array,
  //   require: true,
  //   default: () => [
  //     { title: '电站数量', num: '3070+', unit: '个', icon: 'storage', subTitle: '削峰填谷', subNum: '860', subUnit: '万元' },
  //     { title: '装机容量', num: '148', unit: 'MWh', icon: 'storage', subTitle: '需量管理', subNum: '100', subUnit: '万元'  },
  //     { title: '累计收益', num: '1260', unit: '万元', icon: 'storage', subTitle: '新能源消纳', subNum: '300', subUnit: '万元'  },
  //   ]
  // },
});

const overviewListI18n = computed(() => [
    // 2024.6.11, 按照当天人民币比欧元汇率 1:7.8，换算成欧元 860万元 = 860*10000/7.8/1000 = €1102K
    { title: i18n.t('system.powerStationAmount'), num: '3070+', unit: isZh.value ? '个' : '', icon: 'storage', subTitle: i18n.t('system.peakLoadShifting'), subNum: isZh.value ? '860' : '€1102', subUnit: isZh.value ? '万元' : 'K' },
    // 2024.6.11, 按照当天人民币比欧元汇率 1:7.8，换算成欧元 100万元 = 100*10000/7.8/1000 = €128K
    { title: i18n.t('system.installedCapacity'), num: '148', unit: 'MWh', icon: 'storage', subTitle: i18n.t('system.demandManagement'), subNum: isZh.value ? '100' : '€128', subUnit: isZh.value ? '万元' : 'K'  },
    // 2024.6.11, 按照当天人民币比欧元汇率 1:7.8，换算成欧元 1260万元 = 1260*10000/7.8/1000 = €1615K 300万元 = 300*10000/7.8/1000 = €384K
    { title: i18n.t('system.totalRevenue'), num: isZh.value ? '1260' : '€1615', unit: isZh.value ? '万元' : 'K', icon: 'storage', subTitle: i18n.t('system.newEnergyConsumption'), subNum: isZh.value ? '300' : '€384', subUnit: isZh.value ? '万元' : 'K'  },
])

const itemPadding = computed(() => {
  switch (i18n.locale.value) {
    case i18nConstant.CN:
      return { padding: '1rem 1.8rem' }
    case i18nConstant.EN:
      return { padding: '1rem 1.2rem' }
    default:
      return { padding: '1rem 1.8rem' }
  }
})

const subTitleStyle = computed(() => {
  switch (i18n.locale.value) {
    case i18nConstant.CN:
      return { 'font-size': '16px' }
    case i18nConstant.EN:
      return { 'font-size': '12px' }
    default:
      return { 'font-size': '16px' }
  }
})

const imgRet = (icon) => {
  return new URL(`../../assets/img/solu/${icon}.png`, import.meta.url).href
}
</script>

<style lang="less">
@import '@/assets/style/solution/style.less';
.energy-storage {
  height: 100%;
  .item-back {
    position: relative;
    border: 0.5px solid #ffffff22;
    padding: 1rem 1.8rem;
    z-index: -1;
    .angle {
      position: absolute;
      width: 10px;
      height: 10px;
    }

    .angle-left-top {
      top: 0;
      left: 0;
      border-left: 1px solid rgba(7,185,255,0.5);
      border-top: 1px solid rgba(7,185,255,0.5);
    }
    .angle-left-top:after{
      content: "";
      border-radius: 0;
      font-size: 0;
      width: 0;
      height: 0;
      position: absolute;
      padding: 0;
      top:-4px;
      right:0;
      border-left: 1px solid transparent;
      border-right: 1px solid rgb(28,32,122);
      border-bottom: 1px solid rgb(28,32,122);;
    }
    .angle-left-top:before{
      content: "";
      border-radius: 0;
      font-size: 0;
      width: 0;
      height: 0;
      position: absolute;
      padding: 0;
      bottom:0;
      left:-4px;
      border-top: 1px solid transparent;
      border-right: 1px solid rgb(28,32,122);
      border-bottom: 1px solid rgb(28,32,122);;
    }
    .angle-right-top {
      top: 0;
      right: -2px;
      border-right: 1px solid rgba(7,185,255,0.5);
      border-top: 1px solid rgba(7,185,255,0.5);
    }
    .angle-right-top:after{
      content: "";
      border-radius: 0;
      font-size: 0;
      width: 0;
      height: 0;
      position: absolute;
      padding: 0;
      bottom:0;
      right:-4px;
      border-right: 1px solid transparent;
      border-left: 1px solid rgb(28,32,122);
      border-bottom: 1px solid rgb(28,32,122);;
    }
    .angle-right-top:before{
      content: "";
      border-radius: 0;
      font-size: 0;
      width: 0;
      height: 0;
      position: absolute;
      padding: 0;
    top:-4px;
      left:0;
      border-top: 1px solid transparent;
      border-left: 1px solid rgb(28,32,122);
      border-bottom: 1px solid rgb(28,32,122);;
    }

    .angle-left-bottom {
      bottom: 0;
      left: 0;
      border-bottom: 1px solid rgba(7,185,255,0.5);
      border-left: 1px solid rgba(7,185,255,0.5);
    }
    .angle-left-bottom:after{
      content: "";
      border-radius: 0;
      font-size: 0;
      width: 0;
      height: 0;
      position: absolute;
      padding: 0;
      bottom:-4px;
      right:0;
      border-left: 1px solid transparent;
      border-top: 1px solid rgb(28,32,122);
      border-right: 1px solid rgb(28,32,122);;
    }
    .angle-left-bottom:before{
      content: "";
      border-radius: 0;
      font-size: 0;
      width: 0;
      height: 0;
      position: absolute;
      padding: 0;
      top:0;
      left:-4px;
      border-left: 1px solid transparent;
      border-top: 1px solid rgb(28,32,122);
      border-right: 1px solid rgb(28,32,122);;
    }

    .angle-right-bottom {
      bottom: 0;
      right: -2px;
      border-right: 1px solid rgba(7,185,255,0.5);
      border-bottom: 1px solid rgba(7,185,255,0.5);
    }

    .angle-right-bottom:after{
      content: "";
      border-radius: 0;
      font-size: 0;
      width: 0;
      height: 0;
      position: absolute;
      padding: 0;
      bottom:-4px;
      left:0;
      border-right: 1px solid transparent;
      border-top: 1px solid rgb(28,32,122);
      border-left: 1px solid rgb(28,32,122);;
    }
    .angle-right-bottom:before{
      content: "";
      border-radius: 0;
      font-size: 0;
      width: 0;
      height: 0;
      position: absolute;
      padding: 0;
      top:0;
      right:-4px;
      border-right: 1px solid transparent;
      border-top: 1px solid rgb(28,32,122);
      border-left: 1px solid rgb(28,32,122);;
    }
  }
  .cover {
    height: 14rem;
    background: @item-background;
    box-shadow: @item-boxshadow;
  }
  .image {
    height: 6rem;
    width: 6rem;
  }
  .cover-title {
    font-size: 12px;
    white-space: nowrap;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: rgba(109,255,255,0.7);
    line-height: 14px;
    -webkit-background-clip: text;
  }
  .cover-sub-title {
    font-size: 16px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #6DFFFF;
    // line-height: 45px;
  }
  .cover-num {
    font-size: 20px;
    font-family: AlimamaShuHeiTi, AlimamaShuHeiTi;
    font-weight: bold;
    color: #FFFFFF;
    line-height: 22px;
    -webkit-background-clip: text;
  }
  .cover-unit {
    font-size: 12px;
  }
  .cover-sub-num {
    font-size: 20px;
    font-family: AlimamaShuHeiTi, AlimamaShuHeiTi;
    font-weight: bold;
    color: #FFFFFF;
    line-height: 48px;
    text-shadow: 0px 0px 9px rgba(21,154,255,0.5);
    -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
  }
  .sub {
    top: -0.2rem;
    width: 4rem;
    transform: translateX(-50%);
    left: 50%;
  }
}
</style>