<script setup lang="ts">
import { Chart } from '@antv/g2';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router'
import API from '@/api/index';
import { arr2 } from '@/json/datas';
const router = useRoute()

const props = defineProps({
    reload: Boolean
})

type TopArr = {
    name: string,
    val: number
}[]

let data = reactive({
    topArr: <TopArr>[]
})

onMounted(() => {
    getData()
})

const getData = () => {
    let params = {
        token: router.query.token || ''
    }
    API.getStationRank(params).then((res: any) => {
        if(res.result) {
            data.topArr = res.result.reverse()
			
            TopRender(data.topArr)
        }
    })
}

const TopRender = (resData: TopArr) => {
    const chart = new Chart({
        container: 'toplist',
        autoFit: true,
        padding: [50, 50, 30, 50],
        // renderer: 'svg'
    });

    chart.data(resData);

    chart.scale('population', { nice: true });

    chart.coordinate().transpose();

    chart.tooltip({
        showMarkers: false
    });

    chart.interaction('active-region');

    chart.interval().position('name*val').color('name')
        .label('val', (val) => {
            return {
                content: () => {
                    return `${val}`;
                },
                style: {
                    fill: 'rgba(255,255,255,.85)'
                }
            };
        })
        .style({
            radius: [3, 3, 0, 0]
        })

    //  坐标轴 X 轴调整
    chart.axis('val', {
        title: {
            autoRotate: false,
            position: 'end',
            text: '建站数量（个）',
            style: {
                fill: 'rgba(255,255,255,.85)',
            }
        },
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
        }
    });

    // 坐标轴 Y 轴调整
    chart.axis('name', {
        label: {
            style: {
                fill: 'rgba(255,255,255,.85)',
            }
        }
    })

    // 图例调整
    chart.legend({
        position: 'top',
        offsetX: 0,
        offsetY: 10,
        itemName: {
            style: {
                fill: 'rgba(255,255,255,.85)',
            }
        },
        reversed: true
    });

    chart.render();
}

const getTime = () => {
    let hh = new Date().getHours();
    let mm = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
    let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
    let nTime = hh + ':' + mm + ':' + ss;
	return nTime
}

</script>

<template>
    <div id="toplist" v-if="!reload">
        <el-empty v-if="!data.topArr.length" style="width: 100%;" image="https://cdn01.rrsjk.com/images/73348e25-86f6-4481-ae03-408e34d1bada.png"
            :imageSize="50" description="建站排行 暂无数据"></el-empty>
    </div>
</template>
