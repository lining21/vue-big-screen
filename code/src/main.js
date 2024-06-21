import Vue from "vue";
import App from "./App.vue";
import router from './router'
import store from './store'
import { Radio, Button, RadioGroup } from 'element-ui'
import Echart from './components/echart/index.vue'
import ItemWrap from './components/item-wrap/item-wrap.vue'
import Message from './components/message/message.vue'
import Reacquire from './components/reacquire/reacquire.vue'
import Messages from './components/message/message'
import "vue-easytable/libs/theme-default/index.css";
import  '@/assets/css/public.scss'
import "@/assets/css/index.scss"


import * as filters from '@/directives/filters'
import VueAnimateNumber from 'vue-animate-number'
Vue.use(VueAnimateNumber)

require('./mock/mock')//是否使用mock
Vue.config.productionTip = false;
// 自定义组件
Vue.component("Echart", Echart)
Vue.component("ItemWrap", ItemWrap)
Vue.component("Message", Message)
Vue.component("Reacquire", Reacquire)
Vue.prototype.$Message =  Messages
// element组件
Vue.use(Radio);
Vue.use(Button);
Vue.use(RadioGroup)

// 全局数据过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");