import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home.vue'),
        meta: {
            keepAlive: false,
            title: '综合大屏'
        }
    },
    {
        path: '/apv',
        name: 'apvScreen',
        component: () => import('@/views/apvScreen.vue'),
        meta: {
            keepAlive: false,
            title: '智慧大屏'
        }
    },
    {
        path: '/analogScreen',
        name: 'analogScreen',
        component: () => import('@/views/analogScreen.vue'),
        meta: {
            keepAlive: false,
            title: '智慧大屏2'
        }
    },
    {
        path: '/solutionScreen',
        name: 'solutionScreen',
        component: () => import('@/views/solutionScreen.vue'),
        meta: {
            keepAlive: false,
            title: '智慧大屏3'
        }
    },
    {
        path: '/solutionScreenI18n',
        name: 'solutionScreenI18n',
        component: () => import('@/views/solutionScreenI18n.vue'),
        meta: {
            keepAlive: false,
            title: '智慧大屏3'
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: "/404",
        meta: {
            title: 'not-found'
        }
    },
    {
        path: '/404',
        name: 'not-found',
        component: () => import('@/views/404.vue'),
        meta: {
            title: 'not-found'
        }
    },
]

const router = createRouter({
	history: createWebHistory("/dashboard/"),
	routes
})

export default router