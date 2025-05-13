<script setup lang="ts">
import { Chart } from '@antv/g2';
import { onMounted, onUnmounted, reactive } from 'vue';
import { ElMessage } from 'element-plus'
import API from '@/api/index';

import { useRoute } from 'vue-router'
const router = useRoute()

const props = defineProps({
    reload: Boolean
})

type Datas = {
    name: string,
    area: string,
    val: number
}

const data = reactive({
    areas: []
})

onMounted(() => {
    getData()
})

onUnmounted(() => {
    // 销毁事件
    ElMessage.closeAll()
})

const getData = () => {
    let params = {
        token: router.query.token || ''
    }
    if (router.query.token !== 'Lq2l') {
        ElMessage.error({
            message: '无权限访问此页面',
            duration: 0,
            center: true
        })
    }
    API.getCoverageArea(params).then((res: any) => {
        if (res.result) {
            data.areas = res.result
            AreaRender(res.result)
        }
    })
}

const AreaRender = (resData: Datas[]) => {
    const chart = new Chart({
        container: 'area',
        autoFit: true,
        padding: [50, 100, 30, 100],
        // renderer: 'svg'
    });

    chart.data(resData);

    // 度量
    chart.scale('val', {
        nice: true,
    });

    // 提示内容
    chart.tooltip({
        showMarkers: true,
        shared: true,
    });

    // 初始化
    chart
        .interval()
        .position('area*val')
        .color('name')
        .adjust([
            {
                type: 'dodge',
                marginRatio: 0.25,
            },
        ])
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
    // .size(30);

    // 图例调整
    chart.legend({
        position: 'right',
        offsetX: -20,
        offsetY: -30,
        itemName: {
            style: {
                fill: 'rgba(255,255,255,.85)',
            }
        }
    });

    //  坐标轴 Y 轴调整
    chart.axis('val', {
        title: {
            autoRotate: false,
            position: 'end',
            text: '（个）',
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

    // 坐标轴 X 轴调整
    chart.axis('area', {
        label: {
            style: {
                fill: 'rgba(255,255,255,.85)',
            }
        }
    })

    // 交互
    chart.interaction('active-region');

    chart.render();
}

</script>

<template>
    <div id="area" v-if="!reload">
        <el-empty v-if="!data.areas.length" style="width: 100%;"
            image="https://cdn01.rrsjk.com/images/73348e25-86f6-4481-ae03-408e34d1bada.png" :imageSize="50"
            description="覆盖区域量 暂无数据"></el-empty>
    </div>
</template>
