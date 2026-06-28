import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/HomeView.vue')
    },
    {
        path: '/setting',
        name: 'Setting',
        component: () => import('../views/Setting.vue')
    }
    ,
    {
        path: '/uitest',
        name: 'UITest',
        component: () => import('../views/UITest.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router