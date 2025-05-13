<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router'
import API from '@/api/index';
const router = useRoute()

const props = defineProps({
    reload: Boolean
})

type OrderArr = {
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
    orderArr: <OrderArr>{
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
})

const getData = () => {
    let params = {
        token: router.query.token || ''
    }
    API.getOrder(params).then((res:any) => {
        if(res.result) {
            data.orderArr = res.result
        }
    })
}
</script>

<template>
<table border="0" cellspacing="0" cellpadding="0">
    <tr>
        <th width="20%">项目</th>
        <th width="20%">本日实际</th>
        <th width="20%">本月实际</th>
        <th width="20%">累计实际</th>
        <th width="20%">年度实际</th>
    </tr>
    <tr>
        <td>户数</td>
        <td>{{ data.orderArr.quantity.dayReach }}</td>
        <td>{{ data.orderArr.quantity.monthReach }}</td>
        <td>{{ data.orderArr.quantity.totalReach }}</td>
        <td>{{ data.orderArr.quantity.yearReach }}</td>
    </tr>
    <tr>
        <td>装机量（千瓦）</td>
        <td>{{ data.orderArr.power.dayReach }}</td>
        <td>{{ data.orderArr.power.monthReach }}</td>
        <td>{{ data.orderArr.power.totalReach }}</td>
        <td>{{ data.orderArr.power.yearReach }}</td>
    </tr>
</table>
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
</style>
