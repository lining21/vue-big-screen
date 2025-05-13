import { ElMessage } from 'element-plus'
import {
	defineStore
} from "pinia";

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
// export const useStore = defineStore(ID, 对象) 等同于下面
export const useStore = defineStore('globalStatus', {
	// id: 必须的，在所有 Store 中唯一
	// state: 返回对象的函数
	// 类似于组件的 data，用储存全局状态
	// 1.必须是函数：在服务端渲染时避免交叉请求导致的数据状态污染
	// 2.必须是箭头函数：为了更好的 TS 类型推导
	state: () => ({
		screenZoom: 1,
        timer: false
	}),
	// 类似组件的 method ，用来封装业务逻辑，修改 state
	// 注意不能使用箭头函数定义 action，因为剪头函数绑定外部 this
	actions: {
		resize() {
            this.screenZoom = document.body.clientHeight / 1080;
			window.onresize = () => {
                return (() => {
                    if (!this.timer) {
                        this.timer = true
                        setTimeout(() => {
                            // if (document.body.clientHeight < 800) {
                            //     // ElMessage.closeAll()
                            //     ElMessage({
                            //         message:'您的窗口太小，可能导致不完整显示',
                            //         center: true
                            //     })
                            // }
                            this.screenZoom = document.body.clientHeight / 1080;
                            this.timer = false
                        }, 1000)
                    }
                })();
            }
		}
	}
});
