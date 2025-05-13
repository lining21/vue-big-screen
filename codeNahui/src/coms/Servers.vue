<script setup lang="ts">
import { Chart } from '@antv/g2';
import { onMounted, reactive} from 'vue';
import { useRoute } from 'vue-router'
import API from '@/api/index';
const router = useRoute()

const props = defineProps({
    reload: Boolean
})

type PolyData = {
    day: string,
    value: number
}[]

type PieData = {
	count: number,
    item: string,
    percent: number
}[]

let data = reactive({
    polyData: <PolyData>[],
	pieData: <PieData>[]
})

onMounted(() => {
	getData()
})

const getData = () => {
    let params = {
        token: router.query.token || ''
    }
    API.getWorkOrderCount(params).then((res: any) => {
        if(res.result) {
            data.polyData = res.result.reverse()
            polylineRender(data.polyData)
        }
    })
}

// 折线图
const polylineRender = (resData: PolyData) => {
    const chart = new Chart({
        container: 'polyline',
        autoFit: true,
        height: 500,
        padding: [30, 40, 20, 40]
    });

    chart.data(resData);
    chart.scale({
        day: {
            range: [0, 1],
        },
        value: {
            min: 0,
            nice: true,
        },
    });

    chart.tooltip({
        showCrosshairs: true, // 展示 Tooltip 辅助线
        shared: false,
        showTitle: false,
        showMarkers: false,
    });

    chart.legend(false);

    chart.line()
        .position('day*value')
        .color('value', (value) => {
            return '#37e64e'
        })
        // .label('value', (value) => {
        //     return {
        //         style: {
        //             fill: 'rgba(255,255,255,.85)'
        //         }
        //     }
        // })
        .tooltip('day*value', (day: string, val: number) => {
            return {
                name: day,
                value: val+' 单',
            };
        });

    chart.point()
        .position('day*value')
        .color('value', (value) => {
            return '#37e64e';
        })
        .tooltip('day*value', (day: string, val: number) => {
            return {
                name: day,
                value: val,
            };
        });

    //  坐标轴 Y 轴调整
    chart.axis('value', {
        line: {
            style: {
                stroke: 'rgba(255,255,255,.65)',
            }
        },
        title: {
            autoRotate: false,
            position: 'end',
            offset: -40,
            text: '工单量（单）',
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
    chart.axis('day', {
        label: {
            style: {
                fill: 'rgba(255,255,255,.85)',
            }
        }
    })

    chart.render();
}

// 环图
const ringRender = () => {
    const data = [
        { name: '日常运维', value: 0 },
        { name: '低效电站排查', value: 0 },
        { name: '电站巡检', value: 0 },
        { name: '特殊运维', value: 0 },
        { name: '收益异常处理', value: 0 },
    ];

    let total =  0
    data.map(e => {
        total += e.value
    })

    const chart = new Chart({
        container: 'ring',
        autoFit: true,
        height: 500,
        padding: [20, 180, 20, 20]
    });

    chart.data(data);
    chart.coordinate('polar', {
        innerRadius: 0.45,
    })

    chart.axis(false);
    chart.tooltip({
        showMarkers: false,
        showTitle: false,
    });

    chart.legend({
        position: 'right',
        offsetX: -80,
        layout: 'vertical',
        flipPage: true,
        itemName: {
            style: {
                fill: 'rgba(255,255,255,.85)',
            }
        },
        pageNavigator: {
            marker: {
                style: {
                    // 非激活，不可点击态时的填充色设置
                    inactiveFill: '#eee',
                    inactiveOpacity: 0.45,
                    // 默认填充色设置
                    fill: '#fff',
                    opacity: 0.8,
                    size: 14,
                },
            },
            text: {
                style: {
                    fill: '#fff',
                    fontSize: 12,
                },
            },
        },
    });

    chart.interaction('element-highlight');
    chart
        .interval()
        .position('name*value')
        .color('name')
        .tooltip('name*value', (name: string, val: number) => {
            return {
                name: name,
                value: val,
            };
        })
        .label('value', (value: number) => {
            return {
                content: (data) => {
                    return `${value}`;
                },
                style: {
                    fill: 'rgba(255,255,255,.85)'
                }
            };
        })
    
    // 辅助文本
    chart
        .annotation()
        .text({
            position: ['50%', '50%'],
            content: '当月工单',
            style: {
                fontSize: 11,
                fill: 'rgba(255,255,255,1)',
                textAlign: 'center',
            },
            offsetX: 0,
            offsetY: -5,
        })
        .text({
            position: ['50%', '50%'],
            content: total,
            style: {
                fontSize: 12,
                fill: 'rgba(255,255,255,1)',
                textAlign: 'center',
            },
            offsetX: 0,
            offsetY: 10,
        })

    chart.render();
}

</script>

<template>
    <div class="servers">
        <div v-if="!reload" id="polyline" style="height: 90%;" >
			<el-empty v-if="!data.polyData.length" style="width: 100%;" image="https://cdn01.rrsjk.com/images/73348e25-86f6-4481-ae03-408e34d1bada.png"
		    :imageSize="50" description="工单量 暂无数据"></el-empty>
		</div>
    </div>
</template>
