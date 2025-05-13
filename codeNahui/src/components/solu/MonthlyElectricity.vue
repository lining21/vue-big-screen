<template>
  <div class="monthly">
    <Header :title="title"></Header>
    <div class="flex justify-between px-4">
      <div class="legend-title">
        单位：MWh
      </div>
      <div class="flex">
        <!-- <div class="flex items-center mr-4" v-for="item in legendList" :key="item.color">
          <div class="legend-item mr-1" :style="`background: ${item.color}`"></div>
          <div class="legend-title">{{item.text}}</div>
        </div> -->
      </div>
    </div>
    <div id="monthly-cont" class="mt-3"></div>
  </div>
</template>

<script setup>
import Header from './Header.vue';
import { Chart } from '@antv/g2';
import DataSet from '@antv/data-set';
import { MonthlyData } from './constant';
import { onMounted, ref, nextTick } from 'vue';

const props = defineProps({
  title: {
    type: String,
    require: true,
    default: "标题"
  },
})

const legendList = ref([
  { color: '#00F0FF', text: '往月同期' },
  { color: '#56E185', text: '最近二个月' },
])

onMounted(() => {
  
  // 数据需要加工成 {date: '1996', type: '最近二个月', value: 50} 的模式
  const dv = new DataSet.DataView().source(MonthlyData);
  dv.transform({
    type: 'fold',
    fields: ['最近二个月', '往月同期'], // 展开字段集
    key: 'type', // key字段
    value: 'value', // value字段
  });

  const chart = new Chart({
    container: 'monthly-cont',
    autoFit: true,
    padding: [ 10, 20, 50, 50 ]
    // height: 500,
  });

  chart.data(dv.rows);
  chart.scale('date', {
    range: [0, 1],
  });
  chart.scale('value', {
    nice: true,
  });
  chart.tooltip({
    shared: true,
    showCrosshairs: true,
  });
  chart.legend(false)
  chart.axis('value', {
    grid: {
      line: {
        style: {
          lineWidth: 0.5,
          lineDash: [5, 2], //虚线
        },
      }
    },
    // title: {
    //     text: '单位：MWh', // 标题内容
    //     autoRotate: false,
    //     position: "end",
    //     offset: 20, // 可以通过 padding 值配合来保证显示位置
    //     style: {
    //         fill: "#00FFF4",//文字颜色
    //         fontSize: '12', // 文本大小
    //         fontWeight: 'bold', // 文本粗细
    //     },
    // },
    label: {
      style:{
        fill:"#00FFF4",//文字颜色
        fontWeight: 400,//文字粗细
        fontSize: 12,//文字大小
      }
    },
  });

  chart.axis('date', {
    label: {
      style:{
        fill:"#00FFF4",//文字颜色
        fontWeight: 400,//文字粗细
        fontSize: 12,//文字大小
      }
    },
    line:{
        style: {
          // lineDash: [5,5,5,5],
          stroke: "transparent", // 设置透明颜色
        }
    },
    tickLine: {
        style:{
          stroke: "transparent", // 设置透明颜色
        }
    },
  });

  chart
    .area()
    .position('date*value')
    .color('type', function (name) {
        if (name === '最近二个月') {
          return '#56E185'
        } else if (name === '往月同期') {
          return '#00F0FF'
        }
      });
  chart
    .line()
    .position('date*value')
    .color('type', function (name) {
        if (name === '最近二个月') {
          return '#56E185'
        } else if (name === '往月同期') {
          return '#00F0FF'
        }
      });
  chart.render();

})

</script>

<style lang="less">
@import '@/assets/style/solution/style.less';
.monthly {
  height: 100%;
   #monthly-cont {
    height: 10rem;
    background: @item-background;
    box-shadow: @item-boxshadow;
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