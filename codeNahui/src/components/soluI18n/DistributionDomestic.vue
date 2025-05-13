<template>
  <div class="distribution">
    <Header :title="title"></Header>
    <div class="flex justify-around my-4">
      <div class="legend-title">
        {{ $t(`system.stationAmount`) }}
      </div>
      <div class="flex">
        <div class="flex items-center ml-4" v-for="item in legendList" :key="item.color">
          <div class="legend-item mr-1" :style="`background: ${item.color}`"></div>
          <div class="legend-title">{{item.text}}</div>
        </div>
      </div>
    </div>
    <div id="container" ref="instance" class="mt-3"></div>
  </div>
</template>

<script setup>
import Header from './Header.vue';
import { Choropleth } from '@antv/l7plot';
// import { ProvinceData } from './constant';
import { onMounted, ref, watch, nextTick, computed } from 'vue';
import { useI18n } from 'vue-i18n'
const { t } = useI18n();

const props = defineProps({
  title: {
    type: String,
    require: true,
    default: "标题"
  },
})
let chart = ref(null);
let i18nProvinceData = computed(() => [
  {
    name: t('system.yunnan'),
    code: 530000,
    value: 5001,
  },
  {
    name: t('system.heilongjiang'),
    code: 230000,
    value: null,
  },
  {
    name: t('system.guizhou'),
    code: 520000,
    value: 3001,
  },
  {
    name: t('system.beijing'),
    code: 110000,
    value: 3001,
  },
  {
    name: t('system.hebei'),
    code: 130000,
    value: 5001,
  },
  {
    name: t('system.shanxi'),
    code: 140000,
    value: 5001,
  },
  {
    name: t('system.jilin'),
    code: 220000,
    value: 3001,
  },
  {
    name: t('system.ningxiaHuiAutonomousRegion'),
    code: 640000,
    value: 3001,
  },
  {
    name: t('system.liaoning'),
    code: 210000,
    value: 3001,
  },
  {
    name: t('system.hainan'),
    code: 460000,
    value: 3001,
  },
  {
    name: t('system.innerMongoliaAutonomousRegion'),
    code: 150000,
    value: 3001,
  },
  {
    name: t('system.tianjin'),
    code: 120000,
    value: 5001,
  },
  {
    name: t('system.xinjiangUygurAutonomousRegion'),
    code: 650000,
    value: null,
  },
  {
    name: t('system.shanghai'),
    code: 310000,
    value: null,
  },
  {
    name: t('system.shanxi1'),
    code: 610000,
    value: 5001,
  },
  {
    name: t('system.gansu'),
    code: 620000,
    value: 3001,
  },
  {
    name: t('system.anhui'),
    code: 340000,
    value: 3001,
  },
  {
    name: t('system.hongkong'),
    code: 810000,
    value: null,
  },
  {
    name: t('system.guangdong'),
    code: 440000,
    value: 5001,
  },
  {
    name: t('system.henan'),
    code: 410000,
    value: 10001,
  },
  {
    name: t('system.hunan'),
    code: 430000,
    value: 3001,
  },
  {
    name: t('system.jiangxi'),
    code: 360000,
    value: 3001,
  },
  {
    name: t('system.sichuan'),
    code: 510000,
    value: 3001,
  },
  {
    name: t('system.guangxi'),
    code: 450000,
    value: 10001,
  },
  {
    name: t('system.jiangsu'),
    code: 320000,
    value: 10001,
  },
  {
    name: t('system.macao'),
    code: 820000,
    value: null,
  },
  {
    name: t('system.zhejiang'),
    code: 330000,
    value: null,
  },
  {
    name: t('system.shandong'),
    code: 370000,
    value: 10001,
  },
  {
    name: t('system.qinghai'),
    code: 630000,
    value: null,
  },
  {
    name: t('system.chongqing'),
    code: 500000,
    value: null,
  },
  {
    name: t('system.fujian'),
    code: 350000,
    value: 5001,
  },
  {
    name: t('system.hubei'),
    code: 420000,
    value: 5001,
  },
  {
    name: t('system.xizangTibetAutonomousRegion'),
    code: 540000,
    value: null,
  },
  {
    name: t('system.taiwan'),
    code: 710000,
    value: null,
  },
])

const legendList = computed(() => [
  { color: '#EE423D', text: t('system.Over10000') },
  { color: '#EFEA6D', text: t('system.to5000') },
  { color: '#FFAB4F', text: t('system.under5000') },
])

watch(() => props.title, (newVal) => {
  nextTick(()=>{
    chart.value && chart.value.changeData(i18nProvinceData.value);
  })
})

onMounted(()=>{
  chart.value = new Choropleth('container', {
    map: {
      type: 'mapbox',
      style: 'blank',
      // center: [ 105.72013367626951 , 31.32831590277957],  // 地图中心
      // center: [106.75201145767213, 26.55370065858131],  // 山东中心：济南
      zoom: 1.9,
			maxZoom: 1.9,
			minZoom: 1.9,
      pitch: 26,
      // zoomEnable: true,
    },
    // zoomEnable: false,
    logo: false,
    antialias: true,
    source: {
      data: i18nProvinceData.value,
      joinBy: {
        sourceField: 'code',
        geoField: 'adcode',
      },
    },
    viewLevel: {
      level: 'country',
      adcode: 100000,
    },
    autoFit: true,
    // color: {
    //   field: 'value',
    //   value: ['#0047A5', '#EFEA6D', '#FFAB4F','#EE423D'],
    //   scale: { type: 'quantile' },
    // },
    color: {
      field: 'value',
      value: function(field) {
        const {value} = field
        if (value === 10001) {
          return '#EE423D'
        } else if (value === 5001) {
          return '#EFEA6D'
        } else if (value === 3001) {
          return '#FFAB4F'
        }
        return '#0047A5'
      },
    },
    style: {
      opacity: 0.9,
      stroke: '#fff',
      lineWidth: 0.3,
      lineOpacity: 0.6,
    },
    label: {
      visible: true,
      field: 'name',
      style: {
        fill: '#000',
        opacity: 0.8,
        fontSize: 10,
        stroke: '#fff',
        strokeWidth: 1.5,
        textAllowOverlap: false,
        padding: [5, 5],
      },
    },
    state: {
      active: { stroke: 'black', lineWidth: 1 },
    },
    tooltip: {
      items: ['name', 'adcode'],
    },
    // legend: {
    //   position: 'topright',
    // },
  });
})

</script>

<style lang="less">
@import '@/assets/style/solution/style.less';
.distribution {
  height: 100%;
   #container {
    height: 15rem;
    background: @item-background;
    box-shadow: @item-boxshadow;
    &::after {
      position: absolute;
      bottom: 5%;
      right: 5%;
      content: '';
      width: 15%;
      height: $width*2.5;
      background: url('https://cdn01.rrsjk.com/images/1e384fbc-cabe-4eba-a2dc-263dbd5e9013.png') no-repeat center center;
      background-size: 100%;
      // z-index: 100000;
    }
  }
  .legend-title {
    font-size: 12px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #00FFF4;
    line-height: 17px;
  }
  .legend-item {
    width: 1rem;
    height: 0.5rem;
    // background: #EE423D;
    border-radius: 2px;
  }
}
</style>
