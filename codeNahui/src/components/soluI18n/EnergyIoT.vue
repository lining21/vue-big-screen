<template>
  <div class="home-energy">
    <Header :title="title"></Header>
    <div class="cover flex items-center justify-between">
      <div id="energy-iot-cont" style="width: 50%;height: 100%;"></div>
      <div class="flex flex-col justify-center pb-5" style="width: 55%;height: 100%;">
        <table>
          <tr v-for="item in overviewListI18n" :key="item.num" class="home-energy-item">
            <td>
              <div class="flex items-center pl-2">
                <div class="item-icon mr-2" :style="`background:${item.icon};`"></div>
                <div>{{item.title}}</div>
              </div>
            </td>
            <td align="left" style="color:#D8F0FF">{{item.num}}{{item.unitr}}</td>
            <td align="left" :style="`color:${item.color};`">{{item.unit}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from './Header.vue';
import i18nConstant from '@/i18n/i18nConstant.js';
import { Chart, registerShape } from '@antv/g2';
import { HomeEnergy } from './constant';
import { onMounted, computed, watch, nextTick } from 'vue';
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
  //     { title: '智能插座', num: '4200', unitr: '', icon: '#05CFF7', color: '#05CFF7', unit: '42%' },
  //     { title: '逆变器', num: '3000', unitr: '+', icon: '#1978E5', color: '#1978E5', unit: '31%' },
  //     { title: '热泵', num: '1000', unitr: '+', icon: '#EAB966', color: '#EAB966', unit: '10%' },
  //     { title: '充电桩', num: '200', unitr: '+', icon: '#60B45E', color: '#60B45E', unit: '3%' },
  //     { title: '便携储能', num: '1000', unitr: '+', icon: '#BECDD0', color: '#BECDD0', unit: '10%' },
  //     { title: '其它', num: '300', unitr: '+', icon: '#AD7EC5', color: '#BECDD0', unit: '4%' },
  //   ]
  // },
});
let chart = null
const overviewListI18n = computed(() => [
  { title: i18n.t('system.smartSockets'), num: '4200', unitr: '', icon: '#05CFF7', color: '#05CFF7', unit: '42%' },
  { title: i18n.t('system.inverters'), num: '3000', unitr: '+', icon: '#1978E5', color: '#1978E5', unit: '31%' },
  { title: i18n.t('system.heatPumps'), num: '1000', unitr: '+', icon: '#EAB966', color: '#EAB966', unit: '10%' },
  { title: i18n.t('system.eVChargers'), num: '200', unitr: '+', icon: '#60B45E', color: '#60B45E', unit: '3%' },
  { title: i18n.t('system.portableBATs'), num: '1000', unitr: '+', icon: '#BECDD0', color: '#BECDD0', unit: '10%' },
  { title: i18n.t('system.others'), num: '300', unitr: '+', icon: '#AD7EC5', color: '#BECDD0', unit: '4%' },
])

const colorList = []
const data = computed(()=>overviewListI18n.value.map(item => {
  const obj = {}
  obj.type = item.title
  obj.value = +item.num
  colorList.push(`l(0) 0:#333333 1:${item.icon}`)
  return obj
}))

const renderChart = () => {
  // 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
const sliceNumber = 0.01;

// 自定义 other 的图形，增加两条线
registerShape('interval', 'slice-shape', {
  draw(cfg, container) {
    const points = cfg.points;
    let path = [];
    path.push(['M', points[0].x, points[0].y]);
    path.push(['L', points[1].x, points[1].y - sliceNumber]);
    path.push(['L', points[2].x, points[2].y - sliceNumber]);
    path.push(['L', points[3].x, points[3].y]);
    path.push('Z');
    path = this.parsePath(path);
    return container.addShape('path', {
      attrs: {
        fill: cfg.color,
        path,
      },
    });
  },
});

chart = new Chart({
  container: 'energy-iot-cont',
  autoFit: true,
  // height: 500,
});

chart.data(data.value);
chart.coordinate('theta', {
  radius: 0.75,
  innerRadius: 0.6,
});
chart.tooltip({
  showTitle: false,
  showMarkers: false,
});
// 辅助文本
isZh.value ? 
chart
  .annotation()
  .text({
    position: ['50%', '50%'],
    content: '10000+',
    style: {
      fontSize: 20,
      fill: '#F5FCFF',
      textAlign: 'center',
    },
    offsetY: -20,
  })
  .text({
    position: ['50%', '50%'],
    content: i18n.t('system.total'),
    style: {
      fontSize: 20,
      fill: '#02A3FF',
      textAlign: 'center',
    },
    offsetX: -10,
    offsetY: 10,
  })
  .text({
    position: ['50%', '50%'],
    content: '(个)',
    style: {
      fontSize: 12,
      fill: '#02A3FF',
      textAlign: 'center',
    },
    offsetY: 10,
    offsetX: 20,
  }) :
  chart
  .annotation()
  .text({
    position: ['50%', '50%'],
    content: '10000+',
    style: {
      fontSize: 20,
      fill: '#F5FCFF',
      textAlign: 'center',
    },
    offsetY: -20,
  })
  .text({
    position: ['50%', '50%'],
    content: i18n.t('system.total'),
    style: {
      fontSize: 20,
      fill: '#02A3FF',
      textAlign: 'center',
    },
    offsetX: 0,
    offsetY: 10,
  });
  chart.legend(false)
  chart
    .interval()
    .adjust('stack')
    .position('value')
    .color('type', colorList)
    // .color('type')
    .shape('slice-shape');

  chart.render();
}

onMounted(() => {
  renderChart();
})

// beforeUnmount(() => {
//   chart.destroy();
//   // chart.clear();
//   chart = null;
// })

watch(() => props.title, (newVal) => {
  nextTick(() => {
    console.log('data.value'  , data.value, chart)
    // chart && chart.changeData(data.value);
    chart.destroy();
    // chart.clear();
    chart = null;
    renderChart();
  })
})

</script>

<style lang="less">
@import '@/assets/style/solution/style.less';
.home-energy {
  height: 100%;
  #energy-iot-cont {
    height: 14rem;
    width: 100%;
  }
  .legend-title {
    font-size: 12px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #00FFF4;
    line-height: 17px;
  }
  .cover {
    height: 14rem;
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
  .home-energy-item {
    height: 1.5rem;
    background: linear-gradient(270deg, rgba(26,123,230,0) 0%, rgba(69,193,255,0.3) 100%);
    font-size: 12px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: rgba(212,237,253,0.6);
    .item-icon {
      width: 5px;
      height: 5px;
    }
  }
  table {
    border-collapse: separate; 
    border-spacing: 0px 5px;  /* 水平间距 垂直间距 */
  }
}
</style>