<script setup lang="ts">
import { Chart } from '@antv/g2';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router'
import API from '@/api/index';
const router = useRoute()

const props = defineProps({
    reload: Boolean
})

type RunArr = {
        item: string,
        count: number,
        percent: number
    }[]

let data = reactive({
    runArr: <RunArr>[]
})

onMounted(() => {
    getData()
})

const getData = () => {
    let params = {
        token: router.query.token || ''
    }
    API.getGrid(params).then((res:any) => {
        if(res.result) {
            data.runArr = res.result?.stations
            runRender(res.result?.stations)
        }
    })
}

const runRender = (resData:RunArr) => {
    let total =  0
    resData.map(e => {
        total += e.count
    })
    
    const chart = new Chart({
        container: 'runStatus',
        autoFit: true,
        height: 500,
        padding: [0, 150, 0, 20]
    });
    chart.data(resData);

    chart.scale('percent', {
        formatter: (val) => {
            val = val * 100 + '%';
            return val;
        },
    });

    chart.coordinate('theta', {
        radius: 0.75,
        innerRadius: 0.45,
    });

    // 图例调整
    chart.legend({
        position: 'right',
        offsetX: -100,
        offsetY: 20,
        layout: 'vertical',
        itemName: {
            style: {
                fill: 'rgba(255,255,255,.85)',
            },
            formatter: (text, item, index) => {
                return text + '  ' + resData[index].count
            }
        },
    });

    chart.tooltip({
        showTitle: false,
        showMarkers: false,
        itemTpl: '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
    });

    // 辅助文本
    chart
        .annotation()
        .text({
            position: ['0', '0'],
            content: '运维总数 ' + total,
            style: {
                fontSize: 16,
                fill: 'rgba(255,255,255,.85)',
                textAlign: 'center',
            },
            offsetX: 170,
            offsetY: -10,
        })

    chart
        .interval()
        .adjust('stack')
        .position('percent')
        .color('item')
        .label('percent', (percent:number) => {
            return {
                content: (data) => {
                    return `${parseFloat((percent * 100).toFixed(2))}%`;
                },
                style: {
                    fill: 'rgba(255,255,255,.85)'
                }
            };
        })
        .tooltip('item*count', (item:string, count:number) => {
            return {
                name: item,
                value: count,
            };
        });

    chart.interaction('element-active');

    chart.render();
}

</script>

<template>
    <div id="runStatus" v-if="!reload">
        <el-empty v-if="!data.runArr.length" style="width: 100%;" image="https://cdn01.rrsjk.com/images/1613c253-24eb-4aa8-b1eb-a6ac6e1fb42c.png"
            :imageSize="50" description="暂无数据"></el-empty>
    </div>
</template>
