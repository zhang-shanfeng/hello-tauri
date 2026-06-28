<script setup lang="ts">
import { computed } from 'vue';

// Vue 3.5 完美的 Props 解构与默认值定义
const {
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    type = 'button'
} = defineProps<{
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
}>();

// 基础样式：包含暗黑模式适配 (dark:) 以及松开鼠标后缓缓淡出的过渡特效
const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 ease-[--transition-timing-function-fluid] active:duration-0 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 select-none';

// 变体样式（完美支持 Light / Dark 自动切换）
const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700/80 focus:ring-blue-500 shadow-md shadow-blue-500/10 dark:bg-blue-500 dark:hover:bg-blue-400 dark:active:bg-blue-600/80 dark:shadow-none',

    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 active:bg-slate-300/70 focus:ring-slate-400 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 dark:active:bg-slate-600/70',

    outline: 'border border-slate-300 text-slate-700 hover:bg-slate-50 active:bg-slate-100/80 focus:ring-slate-400 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:active:bg-slate-700/80',

    ghost: 'text-slate-700 hover:bg-slate-50 active:bg-slate-100/80 focus:ring-slate-400 dark:text-slate-300 dark:hover:bg-slate-800 dark:active:bg-slate-700/80'
};

// 尺寸样式
const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-5 py-2.5 text-lg gap-2.5'
};

// 动态计算最终类名
const buttonClasses = computed(() => {
    return [
        baseStyles,
        variants[variant],
        sizes[size]
    ].join(' ');
});
</script>

<template>
    <button :type="type" :disabled="disabled || loading" :class="buttonClasses">
        <svg v-if="loading" class="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 0114.32-4.906l1.414-1.414A10 10 0 003.337 14h2.025A7.962 7.962 0 014 12z" />
        </svg>

        <slot />
    </button>
</template>