<script setup lang="ts">
import { Chart } from '@antv/g2';
import { onMounted, reactive } from 'vue';
import { arr3 } from '@/json/datas-0925';

const props = defineProps({
    reload: Boolean
})

type TopArr = {
    name: string,
    val: number
}[]

let data = reactive({
    topArr: <any>[],
	chart: <any>null,
	inx: <number>0
})

onMounted(() => {
	let day = new Date().getDate();
	let nTime = getTime()
	if(!!arr3[nTime]) {
		data.topArr = arr3[nTime]
	} else {
		if(day === 21) {
			data.topArr = Object.values(arr3)[20]
		} else if(day === 22) {
			data.topArr = Object.values(arr3)[30]
		} else {
			data.topArr = Object.values(arr3)[0]
		}
	}
    data.topArr = data.topArr.sort(compare('val'))
    TopRender(data.topArr)
	setArr()
	//test()
})

const getTime = () => {
	let day = new Date().getDate();
	let hh = new Date().getHours();
	return day + '-' + hh;
}

const test = () => {
	let testArr:any = Object.values(arr3)
	setInterval(() => {
		data.inx++
		console.log(data.inx);
		if(data.inx === 29) {
			data.inx = 0
		}
		data.topArr = testArr[data.inx].sort(compare('val'))
		data.chart.changeData(data.topArr)
	}, 2000)
}

const setArr = () => {
	setInterval(() => {
		let nTime = getTime()
		let arr = arr3[nTime]
		// console.log(nTime);
		// console.log(arr);
		if(!!arr) {
			data.topArr = arr.sort(compare('val'))
			data.chart.changeData(data.topArr)
		}
	},60000)
}

const compare = (property:any) => {
    return function(a:any,b:any){
        let value1 = a[property];
        let value2 = b[property];
        return value1 - value2;
    }
}

const TopRender = (resData: TopArr) => {
    const chart = new Chart({
        container: 'toplist',
        autoFit: true,
        padding: [50, 50, 30, 50],
        // renderer: 'svg'
    });
	
	data.chart = chart

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
                    return ``;
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

</script>

<template>
    <div id="toplist" v-if="!reload">
    </div>
</template>
