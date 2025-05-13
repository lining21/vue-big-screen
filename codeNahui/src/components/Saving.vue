<script setup lang="ts">
import { useStore } from '@/stores/index';
import { onMounted, reactive } from 'vue';
import API from '@/api/index';

import { useRoute } from 'vue-router'
const router = useRoute()
const store = useStore()

const props = defineProps({
    reload: Boolean
})

type Savings = {
    title: string,
    values: number,
}[]

let data = reactive({
    savings: <Savings>[
        { title: "二氧化碳减排约（千克）", values: 0 },
        { title: "二氧化硫减排约（千克）", values: 0 }, 
        { title: "节约标准煤约（千克）", values: 0 }, 
        { title: "等效植树约（棵）", values: 0 }]
})

onMounted(() => {
    getData()
})

const getData = () => {
    let params = {
        token: router.query.token || ''
    }
    API.getEnergy(params).then((res: any) => {
        if(res.result) {
            data.savings = res.result
        }
    })
}

</script>

<template>
    <div class="saving">
        <div class="section">
            <div class="counts" v-for="(item, index) in data.savings" :key="index" :style="`zoom: ${store.screenZoom}`">
                <div class="flex-row-center-center imagebox">
                    <img v-if="index === 0" src="@/assets/img/apv/CO2.png" :alt="item.title" />
                    <img v-if="index === 1" src="@/assets/img/apv/SO2.png" :alt="item.title" />
                    <img v-if="index === 2" src="@/assets/img/apv/saving.png" :alt="item.title" />
                    <img v-if="index === 3" src="@/assets/img/apv/tree.png" :alt="item.title" />
                </div>
                <h4 class="title"> {{ item.title }} </h4>
                <div class="val">
                    {{ item.values }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.saving {
    margin-top: 1.25rem;
    width: 100%;

    .section {
        .flex-row-center-between();
        width: 100%;
    }

    .counts {
        .flex-column-center-between();
        padding: 1.875rem 0;
        width: 24%;
        height: 100%;
        background: rgba(0, 0, 127, 0.3);
        border-radius: .3125rem;
        overflow: hidden;
    }

    .imagebox {
        width: 100%;
        height: 50px;
    }

    .title {
        padding: .625rem 0;
        font-size: 1rem;
        color: #e0ffff;
    }

    .val {
        font-family: 'zcoolhy';
        font-size: 1.5625rem;
        line-height: 1;
        background-image: linear-gradient(to bottom, #fff, #0078ff);
        background-clip: text;
        -webkit-background-clip: text;
    }
}
</style>
