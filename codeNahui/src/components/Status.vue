<script setup lang="ts">
import { Chart } from '@antv/g2';
import { useStore } from '@/stores/index';
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router'
import API from '@/api/index';
const router = useRoute()
const store = useStore()

const props = defineProps({
    reload: Boolean
})

type StatusArr = {
    '已签合同': number,
    '施工中': number,
    '完工待验收': number,
    '待并网': number
}

type StatusArrObj = {
    power: {
        dayReach: number,
        monthReach: number,
        totalReach: number,
        yearReach: number
    },
    quantity: {
        dayReach: number,
        monthReach: number,
        totalReach: number,
        yearReach: number
    }
}

let data = reactive({
    statusArr: <StatusArr>{
        '已签合同': 0,
        '施工中': 0,
        '完工待验收': 0,
        '待并网': 0,
    },
    statusArrObj: <StatusArrObj>{
        power: {
            dayReach: 0,
            monthReach: 0,
            totalReach: 0,
            yearReach: 0
        },
        quantity: {
            dayReach: 0,
            monthReach: 0,
            totalReach: 0,
            yearReach: 0
        }
    }
})

onMounted(() => {
    getData()
    // statusRender()
})

const getData = () => {
    let params = {
        token: router.query.token || ''
    }
    API.getInstallShaft(params).then((res: any) => {
        if(res.result) {
            let arr = {
                '已签合同': res.result.signedSum,
                '施工中': res.result.roadworkSum,
                '完工待验收': res.result.waitCheckSum,
                '待并网': res.result.waitGridSum,
            }
            data.statusArr = arr
        }
    })
    API.getInstallt(params).then((res: any) => {
        if(res.result) {
            data.statusArrObj = res.result
        }
    })
}

// 弃用保留 
const statusRender = () => {
    const data: {
        name: string, status: string, val: number
    }[] = [
            { name: '装机量（KW）', status: '已签合同', val: 38 },
            { name: '装机量（KW）', status: '施工中', val: 52 },
            { name: '装机量（KW）', status: '完工待验收', val: 61 },
            { name: '装机量（KW）', status: '待并网', val: 145 },
        ];
    const chart = new Chart({
        container: 'staChart',
        autoFit: true,
        padding: [50, 30, 30, 30],
        // renderer: 'svg'
    });

    chart.data(data);
    chart.scale('val', {
        nice: true,
    });

    chart.tooltip({
        showMarkers: false
    });
    chart.interaction('active-region');

    chart
        .interval()
        .position('status*val')
        .color('name')
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
        .size(30)


    // 图例调整
    chart.legend({
        position: 'top-right',
        offsetX: 0,
        offsetY: 0,
        itemName: {
            style: {
                fill: 'rgba(255,255,255,.85)',
            }
        }
    });

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
        }
    });

    // 坐标轴 X 轴调整
    chart.axis('status', {
        label: {
            style: {
                fill: 'rgba(255,255,255,.85)',
            }
        }
    })

    chart.render();
}
</script>

<template>
    <div class="status">
        <div class="line">
            <div class="step" v-for="(item, name) in data.statusArr" :key="name" :style="`zoom: ${store.screenZoom}`">
                <p class="val">{{ item }}</p>
                <p class="name">{{ name }}</p>
            </div>
        </div>
        <table border="0" cellspacing="0" cellpadding="0" style="margin-top: 3rem;width: 100%;height: calc(100% - 5.5rem)">
            <tr>
                <th width="20%">项目</th>
                <th width="20%">本日实际</th>
                <th width="20%">本月实际</th>
                <th width="20%">累计实际</th>
                <th width="20%">年度实际</th>
            </tr>
            <tr>
                <td>户数</td>
                <td>{{ data.statusArrObj.quantity.dayReach }}</td>
                <td>{{ data.statusArrObj.quantity.monthReach }}</td>
                <td>{{ data.statusArrObj.quantity.totalReach }}</td>
                <td>{{ data.statusArrObj.quantity.yearReach }}</td>
            </tr>
            <tr>
                <td>装机量（千瓦）</td>
                <td>{{ data.statusArrObj.power.dayReach }}</td>
                <td>{{ data.statusArrObj.power.monthReach }}</td>
                <td>{{ data.statusArrObj.power.totalReach }}</td>
                <td>{{ data.statusArrObj.power.yearReach }}</td>
            </tr>
        </table>
        <!-- <div id="staChart" style="height: calc(100% - 5rem)"></div> -->
    </div>
</template>

<style scoped lang="less">
table {
    margin: .3125rem 0;
    padding: 0;
    //background: linear-gradient(0deg, rgba(0, 0, 101, .66), rgba(0, 89, 255, .36));
    background: linear-gradient(180deg, #030454, #020346);

    th,td {
        font-size: .75rem;
        height: 33%;
        border: .0625rem solid hsla(0,0%,100%,.1);
    }

    th {
        background: hsla(0,0%,100%,.15);
    }
}

.status {
    .line {
        .flex-row-center-evenly();
        position: relative;
        margin: 2.5rem 0;
        width: 100%;
        height: .125rem;
        background: linear-gradient(175deg, #0000ff, #fff);
        border-radius: .375rem;

        &::after {
            position: absolute;
            top: -2.5rem;
            right: 0;
            content: '（户数）';
        }

        .step {
            position: relative;
            font-size: .9375rem;
            line-height: 3.125rem;

            &::after {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                content: '';
                width: 1rem;
                height: 1rem;
                border-radius: 50%;
                border: .125rem solid #fff;
                background: #25ae17;
            }

            &:nth-of-type(2)::after {
                background: #cfab19;
            }

            &:nth-of-type(3)::after {
                background: #da3a3a;
            }

            &:nth-of-type(4)::after {
                background: #d65b17;
            }
        }

    }
}
</style>
