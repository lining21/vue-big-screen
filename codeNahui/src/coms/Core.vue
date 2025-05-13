<script setup lang="ts">
import { reactive, onMounted, onUnmounted } from 'vue';
import { L7Plot } from '@antv/l7plot';
import { useStore } from '@/stores/index';
import { arr4, arr5 } from '@/json/datas-0925';
const store = useStore()

const props = defineProps({
    reload: Boolean
})

type Counts = {
    title: string,
    values: number,
    unit: string
}[]

type Numbs = {
    title: string,
    values: number,
}[]

let data = reactive({
    plot: <any>(''),
    counts: <any>[{
        title: "电站数量",
        values: 0,
        unit: '户'
    },
    {
        title: "并网量",
        values: 0,
        unit: 'Mwp'
    },
    {
        title: "发电量",
        values: 0,
        unit: 'MWh'
    },
    {
        title: "运营天数",
        values: 0,
        unit: '天'
    }],
	nTime: <string> '',
	inx: <number>0,
    mapData: <any>[]
})

onMounted(() => {
	let day = new Date().getDate();
	let nTime = getTime()
	if(!!arr4[nTime]) {
		data.counts = arr4[nTime]
	} else {
		if(day === 9) {
			data.counts = Object.values(arr4)[1]
		} else if(day === 10) {
			data.counts = Object.values(arr4)[2]
		} else {
			data.counts = Object.values(arr4)[0]
		}
	}
	mapRender()
	setArr()
	// azoom()
	// test()
})

let azoom = () => {
	setInterval(() => {
			//clearInterval(bzoom);
			data.plot.zoomIn();
			bzoom()
	},20000)
}

let bzoom = () => {
	setInterval(() => {
			//clearInterval(azoom);
			data.plot.zoomOut();
			azoom()
	},10000)
}

const getTime = () => {
	let day = new Date().getDate();
	let hh = new Date().getHours();
	// * return day + '-' + hh;
    return day
}

const test = () => {
	let testArr = Object.values(arr4)
	setInterval(() => {
		data.inx++
		// console.log(data.inx);
		if(data.inx === 29) {
			data.inx = 0
		}
		data.counts = testArr[data.inx]
	}, 2000)
}

const setArr = () => {
	setInterval(() => {
		let nTime = getTime()
		let arr = arr4[nTime]
		// console.log(nTime);
		// console.log(arr);
		if(!!arr) {
			data.counts = arr
		}
	},60000)
}

const mapRender = () => {
	const resData:any[] = arr5

    data.plot = new L7Plot('maper', {
        map: {
            type: 'mapbox',
            // token: '446711d6ed660d3ed676f2849100e3b1',
            // style: 'amap://styles/979837d580946b7ec9bcc925b5500da3',
            style: 'blank',
            center: [ 105.72013367626951 , 31.32831590277957],  // 地图中心
            // center: [116.75201145767213, 36.55370065858131],  // 山东中心：济南
            zoom: 2,
			maxZoom: 2,
			minZoom: 2,
            pitch: 10,
        },
        logo: false,
        antialias: true,
        plots: [
            {
                type: 'choropleth',
                zIndex: 1,
                source: {
                    data: resData,
                    joinBy: {
                        sourceField: 'code',
                        geoField: 'adcode',
                    },
                },
                viewLevel: {
                    level: 'country',
                    adcode: '100000',
                    //granularity: 'city',
                },
                autoFit: false,
                // color: '#0064ff',
                color: {
                    field: 'name',
                    value: ['#B8E1FF', '#7DAAFF', '#3D76DD', '#0047A5', '#001D70'],
                    scale: { type: 'cat' },
                },
                style: {
                    opacity: 0.9,
                    stroke: '#fff',
                    lineWidth: 0.3,
                    lineOpacity: 0.6,
                },
                label: {
                    visible: false,   // 不显示地图名称
                    field: 'name',
                    style: {
                        fill: '#000',
                        opacity: 1,
                        fontSize: 10,
                        stroke: '#f0f0f0',
                        strokeOpacity: 0.6,
                        strokeWidth: 2,
                        textAllowOverlap: false,
                        padding: [0, 0],
                        textOffset: [0, 50],
                    },
                },
            },
            {
                type: 'dot',
                zIndex: 2,
                source: {
                    data: resData,
                    parser: { type: 'json', x: 'lng', y: 'lat' },
                },
                color: '#c6f738',
                size: {
                    field: 'value',
                    //value: ({ value }) => value / 200,
                    value: [2, 5]
                },
                style: {
                    opacity: 1,
                    stroke: '#fff',
                    strokeWidth: 1,
                },
				// shape: 'cylinder', 
                label: {
                    visible: true,
                    field: 'nameVal',
                    style: {
                        fill: '#000',
                        opacity: 1,
                        fontSize: 10,
                        stroke: '#f0f0f0',
                        strokeOpacity: 0.6,
                        strokeWidth: 1,
                        textAllowOverlap: false,
                        padding: [0, 0],
						textAnchor: 'top',
                        textOffset: [0, 10],
                    },
                },
            },
        ],
        layers: [],
    });
    // });
}
</script>

<template>
    <div class="core flex-column-center-between">
        <div class="statistics" :style="`zoom: ${store.screenZoom}`">
            <div class="section">
                <div class="counts" v-for="(item, index) in data.counts" :key="index">
                    <h4 class="title"> {{ item.title }} </h4>
					<div class="info">
						<div class="val">
							{{ item.values }}
						</div>
						<div class="unit">{{ item.unit }}</div>
					</div>
                </div>
            </div>
        </div>
        <div class="map" :style="`zoom: ${store.screenZoom}`">
            <div id="maper" style="width: 100%;;height: 100%;"></div>
        </div>
    </div>
</template>

<style scoped lang="less">
.statistics {
    .flex-column-center-between();
	padding: 1rem 0;
    width: 100%;

    .section {
        .flex-row-center-between();
        width: 100%;
    }

    .numbs {
        .flex-column-center-center();
        width: 25%;
        height: 8.75rem;
    }
	
	.info {
		padding: 1rem;
		width: 100%;
		background: url('https://cdn01.rrsjk.com/images/eb0386fc-674f-44fc-bf69-f29ef7427e97.png') no-repeat center top -5%;
		background-size: auto 100%
	}

    .counts {
        .flex-column-center-between();
        width: 25%;
	}

    .title {
        display: inline-block;
        padding: .3125rem 0;
        font-size: 1rem;
        font-weight: bolder;
        color: #e0ffff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .circle {
        .flex-row-center-center();
        width: 6.25rem;
        height: $width;
        font-size: 1.4688rem;
        font-weight: bolder;
        color: #000;
        background: url('https://cdn01.rrsjk.com/images/b882cedf-50dc-4756-80a0-c0018e3b118e.png') no-repeat center center;
    }

    .val {
        font-family: 'fz';
        font-size: 1.8rem;
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

.map {
	position: relative;
    margin: .3125rem 0;
    padding: .625rem;
	width: 100%;
    height: 58vh;
    background: url(@/assets/img/apv/map.png) no-repeat center center;
    background-size: 100% auto;
    aspect-ratio: 2;
    overflow: hidden;
	
	&::after {
		position: absolute;
		bottom: 5%;
		right: 5%;
		content: '';
		width: 15%;
		height: $width*2.5;
		background: url('https://cdn01.rrsjk.com/images/1e384fbc-cabe-4eba-a2dc-263dbd5e9013.png') no-repeat center center;
		background-size: 100%
	}
}
</style>
