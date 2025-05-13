<script setup lang="ts">
import { Chart } from '@antv/g2';
import { onMounted, onUnmounted, reactive } from 'vue';
import { ElMessage } from 'element-plus'
import { useStore } from '@/stores/index';
const store = useStore()

const props = defineProps({
    reload: Boolean
})

type Counts = {
    title: string,
    values: number,
}[]

type Datas = {
    name: string,
    area: string,
    val: number
}

const data = reactive({
    areas: <Counts>[{
        title: "省（个）",
        values: 17,
    },
    {
        title: "市（个）",
        values: 221,
    },
    {
        title: "区（个）",
        values: 1017,
    },
    ],
})

onMounted(() => {
	
})

onUnmounted(() => {
    // 销毁事件
    ElMessage.closeAll()
})

</script>

<template>
    <div id="area" v-if="!reload">
        <div class="statistics" :style="`zoom: ${store.screenZoom}`">
            <div class="section">
                <div class="numbs" v-for="(item, index) in data.areas" :key="index">
                    <h4 class="title"> {{ item.title }} </h4>
                    <div class="circle" :style="item.values >= 10000 ? 'font-size: 1rem' : ''">
                        {{ item.values }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.statistics {
    .flex-column-center-between();
	padding: 1rem 0;
    width: 100%;
	height: 100%;

    .section {
        .flex-row-center-between();
		justify-content: space-evenly;
        width: 100%;
		height: 100%
    }

    .numbs {
        .flex-column-center-center();
        width: 6.875rem;
        height: 100%;
    }

    .counts {
        .flex-column-center-between();
        width: 25%;
    }

    .title {
        display: inline-block;
		margin-bottom: 1rem;
        padding: .3125rem 0;
        font-size: 1rem;
		min-height: 2rem;
        font-weight: bolder;
        color: #e0ffff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .circle {
        .flex-column-center();
		padding-top: 2rem;
        width: 100%;
        height: 18rem;
        font-size: 1.4688rem;
        font-weight: bolder;
        color: #000;
        background: url('https://cdn01.rrsjk.com/images/b882cedf-50dc-4756-80a0-c0018e3b118e.png') no-repeat center top;
		background-size: 90%;
    }

    .val {
        font-family: 'zcoolhy';
        font-size: 2.5rem;
        line-height: 1;
        background-image: linear-gradient(to bottom, #fff, #0078ff);
        background-clip: text;
        -webkit-background-clip: text;
    }

    .unit {
        font-size: 0.875rem;
        color: #fff;
        font-weight: bold;
    }
}
</style>
