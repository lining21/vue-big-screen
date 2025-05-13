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
    // polylineRender()
    // ringRender()   不做，隐藏
    // pieRender()
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
	API.getWorkTotal(params).then((res: any) => {
	    if(res.result) {
			let ndata = res.result.every((e:any) => e.percent === 0)
			// console.log(ndata);
			data.pieData = ndata? [] : res.result
	        !ndata && pieRender(data.pieData)
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

// 饼图
const pieRender = (resData: PieData) => {
    // const data: {
    //     item: string,
    //     count: number, 
    //     percent: number
    // }[] = [
    //     { item: '服务中', count: 0, percent: 1 },
    //     { item: '超过72小时', count: 0, percent: 0 },
    // ];
	
	let total =  0
	resData.map(e => {
	    total += e.count
	})

    const chart = new Chart({
        container: 'pie',
        autoFit: true,
        height: 500,
        padding: [0, 150, 0, 0]
    });

    chart.coordinate('theta', {
        radius: 0.75,
    });

    chart.data(resData);

    chart.scale('percent', {
        formatter: (val) => {
            val = val * 100 + '%';
            return val;
        },
    });

    chart.tooltip({
        showTitle: false,
        showMarkers: false,
    });

    chart
        .interval()
        .position('percent')
        .color('item')
        .label('percent', {
            content: (data) => {
                return `${(data.percent * 100).toFixed()}%`;
            },
            style: {
                fill: 'rgba(255,255,255,.85)'
            }
        })
		.tooltip('item*count*percent', (item, count, percent) =>{
            return {
				name: item,
				value: (percent * 100).toFixed() + '% （' + count + '）',
			}
        })
        .adjust('stack');

    // 图例调整
    chart.legend({
        position: 'right',
        offsetX: -70,
        offsetY: 20,
        layout: 'vertical',
        itemName: {
            style: {
                fill: 'rgba(255,255,255,.85)',
            },
            formatter: (text, item, index) => {
                return text + ' ' + resData[index].count
            }
        }
    });

    chart.interaction('element-active');

	// 辅助文本
	chart.annotation()
	    .text({
	        position: ['0', '0'],
	        content: '近30天工单总量 ' + total,
	        style: {
	            fontSize: 16,
	            fill: 'rgba(255,255,255,.85)',
	            textAlign: 'center',
	        },
	        offsetX: 200,
	        offsetY: -10,
	    });

    chart.render();
}

</script>

<template>
    <div class="servers">
        <div v-if="!reload" id="polyline" style="height: 45%;" >
			<el-empty v-if="!data.polyData.length" style="width: 100%;" image="https://cdn01.rrsjk.com/images/73348e25-86f6-4481-ae03-408e34d1bada.png"
		    :imageSize="50" description="工单量 暂无数据"></el-empty>
		</div>
        <div v-if="!reload" id="ring" style="height: 10%;padding: .9375rem 0 0 0;" />
        <div v-if="!reload" id="pie" style="height: 45%;" >
			<el-empty v-if="!data.pieData.length" style="width: 100%;" image="https://cdn01.rrsjk.com/images/1613c253-24eb-4aa8-b1eb-a6ac6e1fb42c.png"
			:imageSize="50" description="服务工单占比 暂无数据"></el-empty>
		</div>
    </div>
</template>
