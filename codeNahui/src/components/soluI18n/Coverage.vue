<template>
  <div class="coverage">
    <Header :title="title"></Header>
    <div class="flex justify-between cover" style="padding: 0 2rem;">
      <div class="cover-item flex flex-col justify-center" v-for="item in coverListI18n" :key="item.icon">
        <div class="image">
          <img style="height: 100%;width: 100%;" :src="imgRet(item.icon)"/>
        </div>
        <div class="cover-title">
          {{item.title}}
        </div>
        <div class="flex items-base justify-center">
          <div class="cover-num">{{item.num}}</div>
          <div v-if="isZh">{{item.unit}}</div>
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
  // coverList: {
  //   type: Array,
  //   require: true,
  //   default: () => [
  //     { title: '国家覆盖', num: '30+', unit: '个', icon: 'country' },
  //     { title: '省级覆盖', num: '25', unit: '个', icon: 'province'  },
  //     { title: '市级覆盖', num: '269', unit: '个', icon: 'city'  },
  //     { title: '区县覆盖', num: '1000+', unit: '个', icon: 'region'  }
  //   ]
  // }
});

const coverListI18n = computed(() => [
  { title: i18n.t('system.countriesCovered'), num: '30+', unit: '个', icon: 'country' },
  { title: i18n.t('system.provincesCovered'), num: '25', unit: '个', icon: 'province'  },
  { title: i18n.t('system.citiesCovered'), num: '269', unit: '个', icon: 'city'  },
  { title: i18n.t('system.countiesCovered'), num: '1000+', unit: '个', icon: 'region'  }
])
const imgRet = (icon) => {
  return new URL(`../../assets/img/solu/${icon}.png`, import.meta.url).href
}
</script>

<style lang="less">
@import '@/assets/style/solution/style.less';
.coverage {
  height: 100%;
  .cover {
    height: 12rem;
    background: @item-background;
    box-shadow: @item-boxshadow;
  }
  .image {
    height: 6rem;
    width: 6rem;
  }
  .cover-title {
    font-size: 16px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #6DFFFF;
    // line-height: 45px;
  }
  .cover-num {
    font-size: 24px;
    font-family: AlimamaShuHeiTi, AlimamaShuHeiTi;
    font-weight: bold;
    color: #FFFFFF;
    // line-height: 48px;
    text-shadow: 0px 0px 9px rgba(21,154,255,0.5);
    -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
  }
}
</style>