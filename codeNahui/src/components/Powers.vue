<script setup lang="ts">
import { Chart } from '@antv/g2';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router'
import API from '@/api/index';
const router = useRoute()

const props = defineProps({
    reload: Boolean
})

type PowerArr = {
        month: string | number,
        val: number
    }[]

let data = reactive({
    powerArr: <PowerArr>[]
})

onMounted(() => {
    getData()
    //powersRender()
})

const getData = () => {
    let params = {
        token: router.query.token || ''
    }
    API.getMonthElectricity(params).then((res:any) => {
        if(res.result) {
            data.powerArr = res.result
            powersRender(data.powerArr)
        }
    })
}

const powersRender = (resData:PowerArr) => {
    // const data: {
    //     month: string | number,
    //     val: number
    // }[] = [
    //     { month: '1', val: 38 },
    //     { month: '2', val: 52 },
    //     { month: '3', val: 61 },
    //     { month: '4', val: 145 },
    //     { month: '5', val: 38 },
    //     { month: '6', val: 52 },
    //     { month: '7', val: 61 },
    //     { month: '8', val: 145 },
    //     { month: '9', val: 38 },
    //     { month: '10', val: 52 },
    //     { month: '11', val: 61 },
    //     { month: '12', val: 145 },
    // ];

    const chart = new Chart({
        container: 'powers',
        autoFit: true,
        padding: [60, 30, 20, 50],
        // renderer: 'svg'
    });

    chart.data(resData);
    chart.scale('val', {
        nice: true,
    });

    chart.tooltip({
        showMarkers: false,
        showTitle: false,
    });
    chart.interaction('active-region');

    // 辅助文本
    chart
        .annotation()
        .text({
            position: ['0%', '0%'],
            content: 'MWh',
            style: {
                fontSize: 11,
                fill: 'rgba(255,255,255,1)',
                textAlign: 'center',
            },
            offsetX: 0,
            offsetY: -30,
        })

    // chart
    //     .interval()
    //     .tooltip(false)
    //     .position('month*max')
    //     .color('max',(max) => {
    //         return 'l(45) 0:#00FDFF 1:#0474FF'
    //     })
    //     .style({
    //         radius: [20, 20, 5, 5]
    //     })

    chart
        .interval()
        .position('month*val')
        .color('val',(val) => {
            return 'l(90) 0:#00FDFF 1:#0474FF'
         })
        .label('val', (val) => {
            return {
                style: {
                    fill: 'rgba(255,255,255,.85)'
                }
            };
        })
        .style({
            radius: [30, 30, 5, 5]
        })
        .tooltip('month*val', (month: string, val: number) => {
            return {
                name: month+'月',
                value: val+ ' MWh',
            };
        })
    chart.legend(false)
    
    //  坐标轴 Y 轴调整
    chart.axis('val', {
        grid: {
            line: {
                style: {
                    fill: 'rgb(0,168,255)',
                    strokeOpacity: 0.2
                }
            }
        },
        label: {
            style: {
                fill: 'rgba(255,255,255,.85)',
            }
        },
    });

    // 坐标轴 X 轴调整
    chart.axis('month', {
        label: {
            style: {
                fill: 'rgba(255,255,255,.85)',
            }
        },
    })

    chart.render();
}
</script>

<template>
    <div id="powers" v-if="!reload" style="height: 100%;">
        <el-empty v-if="!data.powerArr.length" style="width: 100%;" image="https://cdn01.rrsjk.com/images/73348e25-86f6-4481-ae03-408e34d1bada.png"
            :imageSize="50" description="月发电量 暂无数据"></el-empty>
    </div>
</template>
