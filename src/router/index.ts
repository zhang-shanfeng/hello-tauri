import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/HomeView.vue')
    },
    {
        path: '/analog',
        name: 'analog',
        component: () => import('../views/AnalogView.vue'),
        redirect: { name: 'resistor' },
        children: [
            {
                path: 'resistor',
                name: 'resistor',
                component: () => import('../components/analog/resistor/ResistorPanel.vue')
            },
            {
                path: 'capacitor',
                name: 'capacitor',
                component: () => import('../components/analog/capacitor/Capacitor.vue')
            },
            {
                path: 'filter',
                name: 'filter',
                component: () => import('../components/analog/filter/Filter.vue')
            },
            {
                path: 'inductor',
                name: 'inductor',
                component: () => import('../components/analog/inductor/Inductor.vue')
            },
            {
                path: 'power',
                name: 'power',
                component: () => import('../components/analog/power/Power.vue')
            }
        ]
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
        // ✨ 核心：当访问 /uitest 时，自动重定向到指定的子路由路径
        redirect: { name: 'button-view' },
        children: [
            {
                name: 'badge-view',
                path: 'badge-view',
                component: () => import('../views/ui-test-views/BadgeView.vue')
            },
            {
                name: 'button-view',
                path: 'button-view',
                component: () => import('../views/ui-test-views/ButtonView.vue')
            },
            {
                name: 'combobox-view',
                path: 'combobox-view',
                component: () => import('../views/ui-test-views/ComboboxView.vue')
            },
            {
                name: 'separator-view',
                path: 'separator-view',
                component: () => import('../views/ui-test-views/SeparatorView.vue')
            },
            {
                name: 'checkbox-view',
                path: 'checkbox-view',
                component: () => import('../views/ui-test-views/CheckboxView.vue')
            },
            {
                name: 'input-view',
                path: 'input-view',
                component: () => import('../views/ui-test-views/InputView.vue')
            },
            {
                name: 'textarea-view',
                path: 'textarea-view',
                component: () => import('../views/ui-test-views/TextareaView.vue')
            },
            {
                name: 'switch-view',
                path: 'switch-view',
                component: () => import('../views/ui-test-views/SwitchView.vue')
            }
            ,
            {
                name: 'slider-view',
                path: 'slider-view',
                component: () => import('../views/ui-test-views/SliderView.vue')
            }
            ,
            {
                name: 'radio-group-view',
                path: 'radio-group-view',
                component: () => import('../views/ui-test-views/RadioGroupView.vue')
            }
            ,
            {
                name: 'scroll-area-view',
                path: 'scroll-area-view',
                component: () => import('../views/ui-test-views/ScrollAreaView.vue')
            },
            {
                name: 'select-view',
                path: 'select-view',
                component: () => import('../views/ui-test-views/SelectView.vue')
            },
            {
                name: 'tooltip-view',
                path: 'tooltip-view',
                component: () => import('../views/ui-test-views/TooltipView.vue')
            },
            {
                name: 'sonner-view',
                path: 'sonner-view',
                component: () => import('../views/ui-test-views/SonnerView.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router