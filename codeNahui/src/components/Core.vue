<script setup lang="ts">
import {onMounted, onUnmounted, reactive} from 'vue';
import {L7Plot} from '@antv/l7plot';
import {useStore} from '@/stores/index';
import {useRoute} from 'vue-router'
import API from '@/api/index';

const router = useRoute()
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
    numbs: <Numbs>[{
        title: "当日电站数",
        values: 0
    },
    {
        title: "本月电站数",
        values: 0
    },
    {
        title: "累计电站数",
        values: 0
    },
    {
        title: "本月并网量(MW)",
        values: 0
    },
    {
        title: "累计并网量(MW)",
        values: 0
    }],
    counts: <Counts>[{
        title: "日并网量",
        values: 0,
        unit: 'KW(千瓦)'
    },
    {
        title: "实时功率",
        values: 0,
        unit: 'KW(千瓦)'
    },
    {
        title: "日发电量",
        values: 0,
        unit: 'MWh(兆瓦时)'
    },
    {
        title: "总发电量",
        values: 0,
        unit: 'MWh(兆瓦时)'
    },
    {
        title: "发电收益",
        values: 0,
        unit: '万元'
    }],
    mapData: <any>[]
})

onMounted(() => {
    getData()
})

onUnmounted(() => {
    if(data.plot) { data.plot.destroy() }
})

const getData = () => {
    let params = {
        token: router.query.token || ''
    }
    // 并网数据
    API.getGrid(params).then((res: any) => {
        if (res.result) {
            data.numbs = res.result.numbs
            data.counts = res.result.counts
        }
    })
    // 地图
    API.getMap(params).then((res: any) => {
        if (res.result) {
            res.result.map((e: any) => {
                e.nameVal = e.name + '（' + e.value + '）'
            })
             // * 过滤没有经纬度的城市
            data.mapData = res.result?.filter((e: any) => !!e.lat)
            mapRender(data.mapData)
        }
    })
}

const mapRender = (resData: any[]) => {
    // fetch(`https://gw.alipayobjects.com/os/alisis/geo-data-v0.1.2/administrative-data/area-list.json`)
    //     .then((response) => response.json())
    //     .then((list) => {
    // const data:any[] = [
    //     { "parentName": "河北省", "name": "石家庄市", "level": "city", "adcode": 130100, "lng": 114.514976, "lat": 38.042007, "childrenNum": 22, "parent": 130000 },
    //     { "parentName": "山东省", "name": "青岛市", "level": "city", "adcode": 370200, "lng": 120.382665, "lat": 36.066938, "childrenNum": 10, "parent": 370000 },
    //     { "parentName": "山东省", "name": "淄博市", "level": "city", "adcode": 370300, "lng": 118.054994, "lat": 36.813787, "childrenNum": 8, "parent": 370000 },
    //     { "parentName": "河南省", "name": "开封市", "level": "city", "adcode": 410200, "lng": 114.314278, "lat": 34.798083, "childrenNum": 9, "parent": 410000 }]
    //     .filter(({ level }) => level === 'city')
    //     .map((item: any) => Object.assign({}, item, { value: Math.random() * 200 }));

    data.plot = new L7Plot('mapper', {
        map: {
            type: 'mapbox',
            // token: '446711d6ed660d3ed676f2849100e3b1',
            // style: 'amap://styles/979837d580946b7ec9bcc925b5500da3',
            style: 'blank',
            // center: [ 105.72013367626951 , 36.32831590277957],  // 地图中心
            center: [116.75201145767213, 36.55370065858131],  // 山东中心：济南
            zoom: 5,
            maxZoom: 10,
            minZoom: 2,
            pitch: 0,
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
                        padding: [5, 5],
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
                    value: [5, 10]
                },
                style: {
                    opacity: 1,
                    stroke: '#fff',
                    strokeWidth: 1,
                },
                label: {
                    visible: true,
                    field: 'nameVal',
                    style: {
                        fill: '#000',
                        opacity: 1,
                        fontSize: 12,
                        stroke: '#f0f0f0',
                        strokeOpacity: 0.6,
                        strokeWidth: 2,
                        textAllowOverlap: false,
                        padding: [1, 1],
                        textOffset: [0, 40],
                    },
                },
                tooltip: {
                    // items: ['parentName', 'name', 'value'],
                    items: [{
                        field: 'parentName',
                        alias: '省'
                    }, {
                        field: 'name',
                        alias: '市'
                    }, {
                        field: 'value',
                        alias: '累计'
                    }],
                },
            },
        ],
        layers: [],
        zoom: {
            position: 'bottomright',
        },
    });
    // });
}
</script>

<template>
    <div class="core flex-column-center-between">
        <div class="statistics" :style="`zoom: ${store.screenZoom}`">
            <div class="section">
                <div class="numbs" v-for="(item, index) in data.numbs" :key="index">
                    <h4 class="title"> {{ item.title }} </h4>
                    <div class="circle" :style="item.values >= 10000 ? 'font-size: 1rem' : ''">
                        {{ item.values }}
                    </div>
                </div>
            </div>
            <div class="section">
                <div class="counts" v-for="(item, index) in data.counts" :key="index">
                    <h4 class="title"> {{ item.title }} </h4>
                    <div class="val">
                        {{ item.values }}
                    </div>
                    <div class="unit">{{ item.unit }}</div>
                </div>
            </div>
        </div>
        <div class="map">
            <div id="mapper" style="width: 100%;;height: 100%;"></div>
        </div>
    </div>
</template>

<style scoped lang="less">
.statistics {
    .flex-column-center-between();
    width: 100%;
    height: 15.375rem;

    .section {
        .flex-row-center-between();
        width: 100%;
    }

    .numbs {
        .flex-column-center-center();
        width: 25%;
        height: 8.75rem;
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
        background: url(@/assets/img/apv/circle.png) no-repeat center center;
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
        font-size: .8125rem;
        color: #15c994;
        font-weight: bold;
    }
}

.map {
    margin: .9375rem 0 .3125rem 0;
    padding: .625rem;
    height: 50vh;
    background: url(@/assets/img/apv/map.png) no-repeat center center;
    background-size: auto 100%;
    aspect-ratio: 1.9;
    overflow: hidden;
}
</style>
