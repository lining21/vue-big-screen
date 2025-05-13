<template>
  <div id="app">
    <div id="index" ref="appRef">
      <div class="bg">
        <v-loading v-if="loading">Loading...</v-loading>
        <div v-else class="host-body">
          <!-- head -->
          <div class="header flex-row-center-center relative">
            <div v-if="isZh" class="timer flex items-end h-full pb-5">
              <iframe scrolling="no" src="https://widget.tianqiapi.com/?style=tx&skin=banana&color=FFF&fontsize=16&paddingleft=30" frameborder="0" width="100%" height="30" allowtransparency="true"></iframe>
            </div>
            <div class="title text-white pt-3" style="font-size: 2.2rem;"> {{ $t(`system.title`) }} </div>
            <div class="user absolute" style="bottom: -3rem">
              <!-- <el-badge is-dot class="item">
                  <el-icon color="#fff" :size="20"><BellFilled /></el-icon>
              </el-badge>
              <el-avatar icon="Avatar" :size="26" /> -->
              <el-dropdown @command="changeLanguage">
                <span class="el-dropdown-link ml-3">{{ $t(`system.changeLanguage`) }}</span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item :command="i18nConstant.CN" :disabled="currentLanguage===i18nConstant.CN">中  文</el-dropdown-item>
                    <el-dropdown-item :command="i18nConstant.EN" :disabled="currentLanguage===i18nConstant.EN">English</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
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
                      <div class="unit" v-if="isZh">个</div>
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
              <Coverage :title="$t(`system.coverageArea`)" />
              <DistributionDomestic :title="$t(`system.distributionStations`)" class="mt-2" />
              <MonthlyElectricity :title="$t(`system.monthlyPowerGenStats`)" class="mt-2" />
            </div>
            <div class="middle flex-1 mx-4">
              <MiddleGif class="w-full"/>
              <EnergySaving :title="$t(`system.energyReduction`)" class="mt-4" />
            </div>
            <div class="right-region flex flex-col" style="width: 25%;">
              <EnergyStorage :title="$t(`system.nahuiEnergyStats`)" />
              <HomeEnergy :title="$t(`system.householdEnergyStats`)" class="mt-2" />
              <EnergyIoT :title="$t(`system.householdEnergyDeviceStats`)" class="mt-2" />
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import drawMixin from '@/mixins/drawMixin.js'
import i18nConstant from '@/i18n/i18nConstant.js';
import { useI18n } from 'vue-i18n'
import { ref, onMounted, onBeforeUnmount, computed, getCurrentInstance } from 'vue';
import Coverage from '@/components/soluI18n/Coverage.vue'
import EnergyStorage from '@/components/soluI18n/EnergyStorage.vue'
import DistributionDomestic from '@/components/soluI18n/DistributionDomestic.vue'
import MonthlyElectricity from '@/components/soluI18n/MonthlyElectricity.vue'
import HomeEnergy from '@/components/soluI18n/HomeEnergy.vue'
import EnergyIoT from '@/components/soluI18n/EnergyIoT.vue'
import MiddleGif from '@/components/soluI18n/MiddleGif.vue'
import EnergySaving from '@/components/soluI18n/EnergySaving.vue'
const { calcRate, resize, formatTime } = drawMixin();

const i18n = useI18n();
// 获取当前语言
const currentLanguage = computed(() => i18n.locale.value)
const isEn = computed(() => i18n.locale.value === i18nConstant.EN)
const isZh = computed(() => i18n.locale.value === i18nConstant.CN)
// 切换语言
const changeLanguage = (language) => {
  loading.value = true
  localStorage.setItem('language', language)
  i18n.locale.value = language
  cancelLoading()
}

const loading = ref(true);

let timing = null;
const dateDay = ref('');
const dateYear = ref('');
const dateWeek = ref('');
const weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

const appRef = ref();

// 第二行数据
const eyebrowList = computed(() => [
  { title: i18n.t('system.householdPV'), num:'100000+',  power: '3', unit: 'GW', icon: 'household_photovoltaic' },
  { title: i18n.t('system.industrialPV'), num:'180+',  power: '680', unit: 'MW', icon: 'industrial_commercial_photovoltaics' },
  { title: i18n.t('system.publicBuildingPV'), num:'3000+',  power: '260', unit: 'MW', icon: 'public_buildings' },
  { title: i18n.t('system.industrialPowerStations'), num:'60+',  power: '98', unit: 'MWh', icon: 'industrial_commercial_energy_storage_power_stations' },
  { title: i18n.t('system.industrialPVBAT'), num:'30+',  power: '130', unit: 'MWh', icon: 'integrated_industrial_commercial_optical_storage' },
  { title: i18n.t('system.householdPVBAT'), num:'3000+',  power: '30', unit: 'MWh', icon: 'home_optical_storage' }
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
@import '@/assets/style/solutionI18n/index.less';
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
.el-dropdown-link {
  color: #ffffff;
}
</style>