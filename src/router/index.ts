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
        component: () => import('../views/UITest.vue'),
        children: [
            {
                name: 'badge-view',
                path: '/uitest/badge-view',
                component: () => import('../views/ui-test-views/BadgeView.vue')
            },
            {
                name: 'button-view',
                path: '/uitest/button-view',
                component: () => import('../views/ui-test-views/ButtonView.vue')
            },
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router