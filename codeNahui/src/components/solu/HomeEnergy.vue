<template>
  <div class="home-energy">
    <Header :title="title"></Header>
    <div class="cover flex flex-col items-center">
      <div class="flex justify-between" style="padding: 0.5rem 0;width: 90%;">
        <div class="cover-item item-back flex flex-col justify-center" v-for="item in overviewList" :key="item.subNum">
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
      </div>
      <div class="middle-title flex items-center px-4" style="width: 90%;">
        <div class="middle-text flex items-center">
          <div>新能源日消纳</div>
          <div class="arrow-right ml-1"></div>
          <div class="arrow-right"></div>
        </div>
      </div>      
      <div class="legend-title pl-4 w-full flex justify-start mt-3">
        单位：MWh
      </div>
      <div id="home-energy-cont" class="mt-2"></div>
    </div>
  </div>
</template>

<script setup>
import Header from './Header.vue';
import { Chart } from '@antv/g2';
import DataSet from '@antv/data-set';
import { HomeEnergy } from './constant';
import { onMounted, ref, nextTick } from 'vue';
import dayjs from 'dayjs'
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
      { title: '国家数量', num: '30+', unit: '个' },
      { title: '用户数量', num: '3000+', unit: '个' },
      { title: '光伏装机容量', num: '180+', unit: 'MWh' },
      { title: '储能装机容量', num: '30', unit: 'MWh' },
    ]
  },
});

onMounted(() => {
  const HomeEnergyCurrent = HomeEnergy.map((item, index) => {
    item.date = dayjs().subtract(6 - index, 'day').format('MM/DD')
    return item
  })
  // 数据需要加工成 {date: '1996', type: '最近二个月', value: 50} 的模式
  const dv = new DataSet.DataView().source(HomeEnergyCurrent);
  dv.transform({
    type: 'fold',
    fields: ['value'], // 展开字段集
    key: 'type', // key字段
    value: 'value', // value字段
  });

  const chart = new Chart({
    container: 'home-energy-cont',
    autoFit: true,
    padding: [ 10, 30, 30, 60 ]
    // height: 500,
  });
  chart.legend(false);
  chart.data(dv.rows);
  chart.scale('date', {
    range: [0, 1],
  });
  chart.scale('value', {
    nice: true,
  });
  chart.tooltip({
    // shared: true,
    // showCrosshairs: true,
  });

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
    .color('type', function() {
      return '#F0297088'
    });
  chart
    .line()
    .position('date*value')
    .style({
      stroke: '#F0297099',
    })
    .shape('smooth');
    // .color('type', function() {
    //   return '#F02970'
    // });
  chart.render();

})
</script>

<style lang="less">
@import '@/assets/style/solution/style.less';
.home-energy {
  height: 100%;
  #home-energy-cont {
    height: 14rem;
    width: 100%;
  }
  .item-back {
    position: relative;
    border: 0.5px solid #ffffff22;
    padding: 0.5rem 1rem;
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
  .legend-title {
    font-size: 12px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #00FFF4;
    line-height: 17px;
  }
  .cover {
    height: 15rem;
    background: @item-background;
    box-shadow: @item-boxshadow;
  }
  .cover-title {
    font-size: 12px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: rgba(109,255,255,0.7);
    line-height: 14px;
    -webkit-background-clip: text;
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
  .middle-title {
    height: 3rem;
    background: linear-gradient(270deg, rgba(47,132,206,0.06) 0%, rgba(21,77,160,0.3) 100%);
    .middle-text {
      font-size: 12px;
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      color: #00FFF4;
      background: linear-gradient(180deg, #00FFF5 0%, #FFFFFF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .arrow-right{
    height: 12px;
    width: 3px;
    display: inline-block;
    position: relative;
  }
  .arrow-right::after {
    content: "";
    height: 6px;
    width: 6px;
    top: 2.5px;
    border-width: 1px 1px 0 0;
    // border-color: linear-gradient(180deg, #00FFFA 0%, #FFFFFF 100%);
    border-style: solid;
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: absolute;
  }
}
</style>