<template>
    <ul class="user_Overview flex" v-if="pageflag">
        <li class="user_Overview-item" style="color: #00fdfa">
            <div class="user_Overview_nums allnum ">
                <!-- <dv-digital-flop :config="config" style="width:100%;height:100%;" /> -->
                <animate-number ref="allnum" :from="config.numberOrigin" :to="config.number" mode="manual"></animate-number>
            </div>
            <p>总设备数</p>
        </li>
        <li class="user_Overview-item" style="color: #07f7a8">
            <div class="user_Overview_nums online">
                <!-- <dv-digital-flop :config="onlineconfig" style="width:100%;height:100%;" /> -->
                <animate-number ref="online" :from="onlineconfig.numberOrigin" :to="onlineconfig.number" mode="manual"></animate-number>
            </div>
            <p>在线数</p>
        </li>
        <li class="user_Overview-item" style="color: #e3b337">
            <div class="user_Overview_nums offline">
                <!-- <dv-digital-flop :config="offlineconfig" style="width:100%;height:100%;" /> -->
                <animate-number ref="offline" :from="offlineconfig.numberOrigin" :to="offlineconfig.number" mode="manual"></animate-number>

            </div>
            <p>掉线数</p>
        </li>
        <li class="user_Overview-item" style="color: #f5023d">
            <div class="user_Overview_nums laramnum">
                <!-- <dv-digital-flop :config="laramnumconfig" style="width:100%;height:100%;" /> -->
                <animate-number ref="laramnum" :from="laramnumconfig.numberOrigin" :to="laramnumconfig.number" mode="manual"></animate-number>
            </div>
            <p>告警次数</p>
        </li>
    </ul>
    <Reacquire v-else @onclick="getData" line-height="200px">
        重新获取
    </Reacquire>
</template>

<script>
import { currentGET } from 'api/modules'
let style = {
    fontSize: 24
}
export default {
    data() {
        return {
            options: {},
            userOverview: {
                alarmNum: 0,
                offlineNum: 0,
                onlineNum: 0,
                totalNum: 0,
            },
            pageflag: true,
            timer: null,
            config: {
                numberOrigin: 0,
                number: 0
            },
            onlineconfig: {
                numberOrigin: 0,
                number: 0
            },
            offlineconfig: {
                numberOrigin: 0,
                number: 0
            },
            laramnumconfig: {
                numberOrigin: 0,
                number: 0
            }

        };
    },
    filters: {
        numsFilter(msg) {
            return msg || 0;
        },
    },
    created() {
        this.getData()
    },
    mounted() {
    },
    beforeDestroy() {
        this.clearData()

    },
    methods: {
        clearData() {
            if (this.timer) {
                clearTimeout(this.timer)
                this.timer = null
            }
        },
        getData() {
            this.pageflag = true;
            currentGET("big2").then((res) => {
                if (!this.timer) {
                    console.log("设备总览", res);
                }
                if (res.success) {
                    this.userOverview = res.data;
                    // online 数据变化
                    this.$refs.online.reset(this.onlineconfig.number, res.data.onlineNum)
                    this.$refs.online.start()
                    this.onlineconfig = {
                        numberOrigin: this.onlineconfig.number,
                        number: res.data.onlineNum
                    }
                    this.$refs.allnum.reset(this.config.number, res.data.totalNum)
                    this.$refs.allnum.start()
                    this.config = {
                        numberOrigin: this.config.number,
                        number: res.data.totalNum
                    }
                    this.$refs.offline.reset(this.offlineconfig.number, res.data.offlineNum)
                    this.$refs.offline.start()
                    this.offlineconfig = {
                        numberOrigin: this.offlineconfig.number,
                        number: res.data.offlineNum
                    }
                    this.$refs.laramnum.reset(this.laramnumconfig.number, res.data.alarmNum)
                    this.$refs.laramnum.start()
                    this.laramnumconfig = {
                        numberOrigin: this.laramnumconfig.number,
                        number: res.data.alarmNum
                    }
                    this.switper()
                } else {
                    this.pageflag = false;
                    this.$Message.warning(res.msg);
                }
            });
        },
        //轮询
        switper() {
            this.clearData() // 清除 clearTimeout
            let looper = (a) => { // 延迟执行效果
                this.getData()
            };
            this.timer = setTimeout(looper, this.$store.state.setting.echartsAutoTime)
        },
    },
};
</script>
<style lang='scss' scoped>
.user_Overview {
    li {
        flex: 1;

        p {
            text-align: center;
            height: 16px;
            font-size: 16px;
        }

        .user_Overview_nums {
            width: 100px;
            height: 100px;
            text-align: center;
            line-height: 100px;
            font-size: 22px;
            margin: 50px auto 30px;
            background-size: cover;
            background-position: center center;
            position: relative;

            &::before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
            }

            &.bgdonghua::before {
                animation: rotating 14s linear infinite;
            }
        }

        .allnum {

            // background-image: url("../../assets/img/left_top_lan.png");
            &::before {
                background-image: url("../../assets/img/left_top_lan.png");

            }
        }

        .online {
            &::before {
                background-image: url("../../assets/img/left_top_lv.png");

            }
        }

        .offline {
            &::before {
                background-image: url("../../assets/img/left_top_huang.png");

            }
        }

        .laramnum {
            &::before {
                background-image: url("../../assets/img/left_top_hong.png");

            }
        }
    }
}
</style>