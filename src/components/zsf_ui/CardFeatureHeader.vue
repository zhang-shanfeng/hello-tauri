<script setup lang="ts">
/**************************************************************
 * 对 shadcn-vue Card 组件中 CardHeader 组件的封装
 **************************************************************
*/
import { CardHeader } from '@/components/ui/card'; // 请根据你项目的实际路径调整
import { ZapIcon } from '@lucide/vue';
import type { Component } from 'vue';

// 定义 Props 接口，提供完整的类型提示
interface Props {
    /** 卡片标题 */
    title?: string;
    /** 卡片描述 */
    description?: string;
    /** 自定义图标组件，默认为 ZapIcon */
    icon?: Component;
    /** 图标背景色 Tailwind 类名 */
    iconBgClass?: string;
    /** 图标颜色 Tailwind 类名 */
    iconColorClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
    title: '',
    description: '',
    icon: () => ZapIcon,
    iconBgClass: 'bg-emerald-500/10',
    iconColorClass: 'text-emerald-500',
});
</script>

<template>
    <!-- 继承 shadcn-vue 的 CardHeader，并应用自定义样式 -->
    <CardHeader class="flex gap-5 items-center bg-slate-800 dark:bg-slate-900 rounded-t-xl px-6 py-4">
        <div :class="['p-2 rounded-lg shrink-0', props.iconBgClass]">
            <!-- 动态渲染图标组件 -->
            <component :is="props.icon" class="h-5 w-5" :class="props.iconColorClass" />
        </div>

        <div class="min-w-0">
            <h3 class="text-white font-bold text-base tracking-wide truncate">
                <slot name="title">{{ props.title }}</slot>
            </h3>
            <p v-if="props.description || $slots.description" class="text-xs text-slate-400 mt-0.5">
                <slot name="description">{{ props.description }}</slot>
            </p>
        </div>
    </CardHeader>
</template>