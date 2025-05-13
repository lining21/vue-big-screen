<template>
  <div class="distribution">
    <Header :title="title"></Header>
    <div class="flex justify-around my-4">
      <div class="legend-title">
        电站数量(个)
      </div>
      <div class="flex">
        <div class="flex items-center ml-4" v-for="item in legendList" :key="item.color">
          <div class="legend-item mr-1" :style="`background: ${item.color}`"></div>
          <div class="legend-title">{{item.text}}</div>
        </div>
      </div>
    </div>
    <div id="container" class="mt-3"></div>
  </div>
</template>

<script setup>
import Header from './Header.vue';
import { Choropleth } from '@antv/l7plot';
import { ProvinceData } from './constant';
import { onMounted, ref } from 'vue';
const props = defineProps({
  title: {
    type: String,
    require: true,
    default: "标题"
  },
})

const legendList = ref([
  { color: '#EE423D', text: '1万以上' },
  { color: '#EFEA6D', text: '1～0.5万' },
  { color: '#FFAB4F', text: '0.5万以下' }
])

onMounted(()=>{
  new Choropleth('container', {
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
      data: ProvinceData,
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
