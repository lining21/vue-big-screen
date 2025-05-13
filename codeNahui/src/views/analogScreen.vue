<template>
    <div class="wrap" v-loading="data.reload" element-loading-background="rgba(122, 122, 122, 0.5)">
        <div class="header flex-row-center-center">
            <div class="timer">
                <iframe scrolling="no"
                    src="https://tianqiapi.com/api.php?style=tx&skin=banana&color=FFF&fontsize=16&paddingleft=30"
                    frameborder="0" width="100%" height="30" allowtransparency="true"></iframe>
            </div>
            <div class="title"> {{ $BASENAME }}智慧大屏 </div>
            <div class="user">
                <el-badge is-dot class="item">
                    <el-icon color="#fff" :size="20"><BellFilled /></el-icon>
                </el-badge>
                <el-avatar icon="Avatar" :size="26" />
            </div>
        </div>
        <div class="screen">
            <div class="section" style="width: 24%;">
                <div class="conter" style="height: 36%;">
                    <div class="sub-title">覆盖区域 <img src="@/assets/img/apv/dright.png" width="24" /></div>
                    <Area  class="component area" style="width: 100%;height: 100%;" />
                </div>
				<div class="conter" style="height: 32%">
				    <div class="sub-title">建站排行榜 Top5 <img src="@/assets/img/apv/dright.png" width="24" /></div>
				    <Top  class="component" style="width: 100%;height: 100%;" />
				</div>
                <div class="conter" style="height: 32%">
                    <div class="sub-title">装机量排行榜 Top5 <img src="@/assets/img/apv/dright.png" width="24" /></div>
                    <TopList  class="component" style="width: 100%;height: 100%;" />
                </div>
            </div>
            <div class="section" style="width: 48.5%">
                <div class="conter" style="height: 75%">
                    <Coren  class="component" style="width: 100%;height: auto" />
                </div>
                <div class="conter" style="height: 25%">
                    <div class="sub-title">节能减排 <img src="@/assets/img/apv/dright.png" width="24" /></div>
                    <Saving  class="component" style="width: 100%;height: 100%;" />
                </div>
            </div>
            <div class="section" style="width: 24%">
                <div class="conter" style="height: 50%">
                    <div class="sub-title">运维工单 <img src="@/assets/img/apv/dright.png" width="24" /></div>
                    <Servers  class="component" style="width: 100%;height: 100%;" />
                </div>
                <div class="conter" style="height: 50%">
                    <div class="sub-title">月发电量统计 <img src="@/assets/img/apv/dright.png" width="24" /></div>
                    <Powers  class="component" style="width: 100%;height: 100%;" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, reactive } from 'vue';

// 导入组件
import Area from "@/coms/Area.vue";
import TopList from "@/coms/TopList.vue";
import Top from "@/coms/TopList2.vue";
import Coren from "@/coms/Core.vue";
import Saving from "@/coms/Saving.vue";
import Servers from "@/coms/Servers.vue";
import Powers from "@/coms/Powers.vue";
// 使用状态管理
import { useStore } from '@/stores';
const store = useStore()

const data = reactive({
    reload: true,
})

onMounted(() => {
    store.resize()
	data.reload = false
})

onUnmounted(() => {
    // 销毁监听事件
    window.onresize = null
})

</script>

<style lang='less' scoped>
@import '@/assets/style/analog.less';
.wrap {
	background-size: 115% auto
}

.screen .area {
	max-height: calc(100% - 3.5rem) !important;
}
</style>