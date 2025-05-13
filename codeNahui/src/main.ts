// 解决 vite global undefined
if (typeof (window as any).global === 'undefined') {
    ;(window as any).global = window
}
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import i18n from './i18n/index'

const app = createApp(App)
app.config.globalProperties.$BASENAME = '纳晖新能源产业互联网平台'
app.config.globalProperties.$LOADED = false

app.use(router)
app.use(ElementPlus)
app.use(createPinia())
app.use(i18n)
app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 挂载全局站名
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $BASENAME: any;
	$LOADED: boolean;
  }
}

// 路由守卫修改 title
router.beforeEach((to: any, _from: any, next: Function) => {
    /* 路由发生变化修改页面title */
    const name = to.meta?.title
	const global = app.config.globalProperties
    name && (document.title = global.$BASENAME + name)
    next()
})

router.afterEach(() => {
	app.config.globalProperties.$LOADED = true
})
