<template>
    <div class="wrap" v-loading="data.reload" element-loading-background="rgba(122, 122, 122, 0.5)">
        <div class="header flex-row-center-center">
            <div class="timer">
                <iframe scrolling="no" src="https://widget.tianqiapi.com/?style=tx&skin=banana&color=FFF&fontsize=16&paddingleft=30" frameborder="0" width="100%" height="30" allowtransparency="true"></iframe>
            </div>
            <div class="title" @click="reloading" title="点击手动刷新"> {{ $BASENAME }}智慧大屏 </div>
            <div class="user">
                <!-- <el-badge is-dot class="item">
                    <el-icon color="#fff" :size="20"><BellFilled /></el-icon>
                </el-badge> -->
                <span v-if="data.flashTime">最近刷新时间：{{ data.flashTime }} &emsp;</span>
                <el-avatar icon="Avatar" :size="26" />
            </div>
        </div>
        <div class="screen">
            <div class="section" style="width: 27%;">
                <div class="conter" style="height: 24%;">
                    <div class="sub-title">覆盖区域 <img src="@/assets/img/apv/dright.png" width="24" /></div>
                    <Area v-if="!data.reload" :reload="data.reload" class="component area" style="width: 100%;height: 100%;" />
                </div>
                <div class="conter" style="height: 18%;">
                    <div class="sub-title">获单 <img src="@/assets/img/apv/dright.png" width="24" /></div>
                    <Order v-if="!data.reload" :reload="data.reload" class="component" style="width: 100%;height: 100%;" />
                </div>
                <div class="conter" style="height: 28%">
                    <div class="sub-title">安装 <img src="@/assets/img/apv/dright.png" width="24" /></div>
                    <Status v-if="!data.reload" :reload="data.reload" class="component" style="width: 100%;height: 100%;" />
                </div>
                <div class="conter" style="height: 30%">
                    <div class="sub-title">建站排行榜 Top5 <img src="@/assets/img/apv/dright.png" width="24" /></div>
                    <TopList v-if="!data.reload" :reload="data.reload" class="component" style="width: 100%;height: 100%;" />
                </div>
            </div>
            <div class="section" style="width: 42.5%">
                <div class="conter" style="height: 75%">
                    <div class="sub-title">并网电站 <img src="@/assets/img/apv/dright.png" width="24" /></div>
                    <Coren v-if="!data.reload" :reload="data.reload" class="component" style="width: 100%;height: auto" />
                </div>
                <div class="conter" style="height: 25%">
                    <div class="sub-title">节能减排 <img src="@/assets/img/apv/dright.png" width="24" /></div>
                    <Saving v-if="!data.reload" class="component" :reload="data.reload" style="width: 100%;height: 100%;" />
                </div>
            </div>
            <div class="section" style="width: 27%">
                <div class="conter" style="height: 23%">
                    <div class="sub-title">电站情况 <img src="@/assets/img/apv/dright.png" width="24" /></div>
                    <RunStatus v-if="!data.reload" :reload="data.reload" class="component" style="width: 100%;height: 100%;" />
                </div>
                <div class="conter" style="height: 47%">
                    <div class="sub-title">服务工单 <img src="@/assets/img/apv/dright.png" width="24" /></div>
                    <Servers v-if="!data.reload" :reload="data.reload" class="component" style="width: 100%;height: 100%;" />
                </div>
                <div class="conter" style="height: 30%">
                    <div class="sub-title">月发电量统计 <img src="@/assets/img/apv/dright.png" width="24" /></div>
                    <Powers v-if="!data.reload" :reload="data.reload" class="component" style="width: 100%;height: 100%;" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, reactive } from 'vue';
import { ElNotification } from 'element-plus'

// 导入组件
import Area from "@/components/Area.vue";
import Order from "@/components/Order.vue";
import Status from "@/components/Status.vue";
import TopList from "@/components/TopList.vue";
import Coren from "@/components/Core.vue";
import Saving from "@/components/Saving.vue";
import RunStatus from "@/components/RunStatus.vue";
import Servers from "@/components/Servers.vue";
import Powers from "@/components/Powers.vue";
// 使用状态管理
import { useStore } from '@/stores/index';
const store = useStore()

const data = reactive({
    ntime: '',
    flashTime: '',
    timer: {},
    reload: true,
})

onMounted(() => {
    store.resize()
	data.reload = false
    data.timer = setInterval(getTime, 1000);
})

onUnmounted(() => {
    // 销毁监听事件
    window.onresize = null
})

// 按需调用
const getTime = () => {
    let hh = new Date().getHours();
    let mm = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
    let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
    let nTime = data.ntime = hh + ':' + mm + ':' + ss;

    if(!data.flashTime) {
        data.flashTime = nTime
    }

    // 每天刷新数据
    let reloadTime = ["0:05:00", "1:05:00", "2:05:00", "3:05:00", "4:05:00", "5:05:00", "6:05:00", "7:05:00", "8:05:00", "9:05:00",
        "10:05:00", "11:05:00", "12:05:00", "13:05:00", "14:05:00", "15:05:00", "16:05:00", "17:05:00", "18:05:00", "19:05:00",
        "20:05:00", "21:05:00", "22:05:00", "23:05:00"]
    reloadTime.map(time => {
        if (nTime == time) {
            reloading()
        }
    })
}

const reloading = () => {
    ElNotification.closeAll()
    data.reload = true
    setTimeout(() => {
        data.reload = false
        data.flashTime = data.ntime
        ElNotification({
            title: '更新完成',
            message: `最近更新时间：${data.ntime}`,
            type: 'success',
        })
    }, 300)
}

</script>

<style lang='less' scoped>
@import '@/assets/style/apv.less';
</style>