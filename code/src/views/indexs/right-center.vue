<template>
  <Echart
    id="rightTop"
    :options="option"
    class="right_top_inner"
    v-if="pageflag"
    ref="charts"
  />
  <Reacquire v-else @onclick="getData" style="line-height: 200px">
    重新获取
  </Reacquire>
</template>

<script>
import { currentGET } from "api/modules";
const colors =["#73C0DE","#EE6666","#FAC858","#91CC75", "#73C0DE","#EE6666","#FAC858","#91CC75"];

export default {
  data() {
    return {
      option: {},
      pageflag: false,
      timer: null,
    };
  },
  created() {
   
  },

  mounted() {
     this.getData();
     this.$nextTick(() => {
        this.chartMouse();
     });
  },
  beforeDestroy() {
    this.clearData();
  },
  methods: {
    clearData() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
    getData() {
      this.pageflag = true;
      // this.pageflag =false
      currentGET('big7', { gatewayno: this.gatewayno }).then(res => {
        if (!this.timer) {
          console.log('报警排名', res);
        }
        if (res.success) {
          this.countUserNumData = res.data;
          this.$nextTick(() => {
            this.init(res.data.numList, res.data.nameList),
              this.switper();
          });
        } else {
          this.pageflag = false;
          this.$Message({
            text: res.msg,
            type: "warning",
          });
        }
      });
    },
    looper(a) {
      this.getData();
    },
    chartMouse() {
      let myChart = this.$refs.charts.chart;
      myChart.on("mouseover", (params) => {
        this.clearData();
      });
      myChart.on("mouseout", (params) => {
        this.timer = setTimeout(
          this.looper,
          this.$store.state.setting.echartsAutoTime
        );
      });
    },
    //轮询
    switper() {
      this.clearData()
      this.timer = setTimeout(
        this.looper,
        this.$store.state.setting.echartsAutoTime
      );
    },
    init(xData = [120, 200, 150, 80, 120, 200, 150, 80], yData = ['Mon', 'Tue', 'Wed', 'Thu', 'Mon', 'Tue', 'Wed', 'Thu']) {
      this.option = {
        xAxis: {
          type: 'value', // 设置X轴为值轴
          splitLine: {
            show: false  // 设置X轴方向的辅助线是否显示
          },
        },
        yAxis: {
          type: 'category', // 设置Y轴为名称轴
          axisLabel: {
            color: "rgba(255, 255, 255, 1)", // Y轴字体颜色
          },
          data: yData,// Y轴名称
        },
        grid: {
          //布局
          right: "30px",
          bottom: "18px",
          left: "140px",
          top: "8px",
        },
        series: [
          {
            type: "bar", // 图表类型
            // 柱上面的数值配置
            label: {
              show: true, // 显示值
              position: "right", // 显示位置
              color: "white",
            },
            
            barWidth:"70%", // 设置柱子的宽度
            // 每一个条目的样式配置
            itemStyle: {
              //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
              //柱形图圆角，初始化效果
              barBorderRadius:[0, 10, 10, 0],
              // color: "#EE6666" // 这是设置所有柱子为同一个颜色
              // 柱子的颜色设置不同颜色
              color: function(p){
                return colors[p.dataIndex]
              }
            },
            data:xData
          },
        ]
      };
    },
  },
};
</script>
<style lang='scss' scoped>
.list_Wrap {
  height: 100%;
  overflow: hidden;
  :deep(.kong)   {
    width: auto;
  }
}

.sbtxSwiperclass {
  .img_wrap {
    overflow-x: auto;
  }

}

.right_bottom {
  box-sizing: border-box;
  padding: 0 16px;

  .searchform {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;

    .searchform_item {
      display: flex;
      justify-content: center;
      align-items: center;

      label {
        margin-right: 10px;
        color: rgba(255, 255, 255, 0.8);
      }

      button {
        margin-left: 30px;
      }

      input {}
    }
  }

  .img_wrap {
    display: flex;
    // justify-content: space-around;
    box-sizing: border-box;
    padding: 0 0 20px;
    // overflow-x: auto;

    li {
      width: 105px;
      height: 137px;
      border-radius: 6px;
      overflow: hidden;
      cursor: pointer;
      // background: #84ccc9;
      // border: 1px solid #ffffff;
      overflow: hidden;
      flex-shrink: 0;
      margin: 0 10px;

      img {
        flex-shrink: 0;
      }
    }




  }

  .noData {
    width: 100%;
    line-height: 100px;
    text-align: center;
    color: rgb(129, 128, 128);

  }
}
</style>