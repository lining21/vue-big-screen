<template>
  <div id="app">
    <div id="index" ref="appRef">
      <div class="bg">
        <v-loading v-if="loading">Loading...</v-loading>
        <div v-else class="host-body">
          <!-- head -->
          <div class="header flex-row-center-center relative">
            <div class="timer flex items-end h-full pb-5">
              <iframe scrolling="no" src="https://widget.tianqiapi.com/?style=tx&skin=banana&color=FFF&fontsize=16&paddingleft=30" frameborder="0" width="100%" height="30" allowtransparency="true"></iframe>
            </div>
            <div class="title text-white pt-3" style="font-size: 2.2rem;"> 纳晖智慧能源管理解决方案平台 </div>
            <!-- <div class="user absolute" style="bottom: -3rem">
                <el-badge is-dot class="item">
                    <el-icon color="#fff" :size="20"><BellFilled /></el-icon>
                </el-badge>
                <el-avatar icon="Avatar" :size="26" />
            </div> -->
          </div>

          <!-- eyebrow -->
          <div class="flex justify-between mt-2">
            <div class="eyebrow-item flex items-center px-5 ml-2" v-for="item in eyebrowList" :key="item.icon">
                <img :src="imgRet(item.icon)"/>
                <div class="flex flex-col">
                  <div class="item-title pl-3">
                    {{item.title}}
                  </div>
                  <div class="middle-line ml-3 my-1"></div>
                  <div class="flex">
                    <div class="flex items-base ml-3">
                      <div class="num">{{item.num}}</div>
                      <div class="unit">个</div>
                    </div>
                    <div class="flex items-base ml-3">
                      <div class="num">{{item.power}}</div>
                      <div class="unit">{{item.unit}}</div>
                    </div>
                  </div>
                </div>
            </div>
          </div>

          <!-- main-region -->
          <div class="flex">
            <div class="left-region flex flex-col" style="width: 25%;">
              <Coverage title="覆盖区域" />
              <DistributionDomestic title="国内电站分布" class="mt-2" />
              <MonthlyElectricity title="月发电量数据统计" class="mt-2" />
            </div>
            <div class="middle flex-1 mx-4">
              <MiddleGif class="w-full"/>
              <EnergySaving title="节能减排" class="mt-4" />
            </div>
            <div class="right-region flex flex-col" style="width: 25%;">
              <EnergyStorage title="纳晖储能数据概况" />
              <HomeEnergy title="家庭能源数据概况" class="mt-2" />
              <EnergyIoT title="家庭能源物联数据" class="mt-2" />
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import drawMixin from '@/mixins/drawMixin.js'
import { ref, onMounted, onBeforeUnmount  } from 'vue';
import Coverage from '@/components/solu/Coverage.vue'
import EnergyStorage from '@/components/solu/EnergyStorage.vue'
import DistributionDomestic from '@/components/solu/DistributionDomestic.vue'
import MonthlyElectricity from '@/components/solu/MonthlyElectricity.vue'
import HomeEnergy from '@/components/solu/HomeEnergy.vue'
import EnergyIoT from '@/components/solu/EnergyIoT.vue'
import MiddleGif from '@/components/solu/MiddleGif.vue'
import EnergySaving from '@/components/solu/EnergySaving.vue'

const { calcRate, resize, formatTime } = drawMixin();

const loading = ref(true);

let timing = null;
const dateDay = ref('');
const dateYear = ref('');
const dateWeek = ref('');
const weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

const appRef = ref();

// 第二行数据
const eyebrowList = ref([
  { title: '户用光伏', num:'70000+',  power: '2.1', unit: 'GW', icon: 'household_photovoltaic' },
  { title: '工商业光伏', num:'80+',  power: '260', unit: 'MW', icon: 'industrial_commercial_photovoltaics' },
  { title: '公共建筑', num:'1000+',  power: '80', unit: 'MW', icon: 'public_buildings' },
  { title: '工商业储能电站', num:'60+',  power: '98', unit: 'MWh', icon: 'industrial_commercial_energy_storage_power_stations' },
  { title: '工商业光储一体', num:'10+',  power: '20', unit: 'MWh', icon: 'integrated_industrial_commercial_optical_storage' },
  { title: '家庭光储+X', num:'3000+',  power: '30', unit: 'MWh', icon: 'home_optical_storage' }
])

const imgRet = (icon) => {
  return new URL(`../assets/img/solu/${icon}.png`, import.meta.url).href
}

const timeFn = () => {
  timing = setInterval(() => {
    dateDay.value = formatTime(new Date(), 'HH: mm: ss')
    dateYear.value = formatTime(new Date(), 'yyyy-MM-dd')
    dateWeek.value = weekday[new Date().getDay()]
  }, 1000)
};

const cancelLoading = () => {
  setTimeout(() => {
    loading.value = false
  }, 500)
}

onMounted(() => {
    // timeFn()
    cancelLoading()
    calcRate(appRef)
    window.addEventListener('resize', resize)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', resize)
    clearInterval(timing)
})

</script>

<style lang='less' scoped>
@import '@/assets/style/solution/index.less';
@import '@/assets/style/analog.less';
.wrap {
	background-size: 115% auto
}

.screen .area {
	max-height: calc(100% - 3.5rem) !important;
}

.middle-line {
  width: 9rem;
  height: 1px;
  border: 1px solid;
  border-image: linear-gradient(90deg, rgba(0, 255, 255, 0.1), rgba(0, 255, 253, 0.1)) 1 1;
}
</style>