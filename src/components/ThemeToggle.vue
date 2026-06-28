<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { Button } from '@/components/ui/button' // 引入你的 shadcn 按钮

// useDark 会自动监听并在 <html> 标签上切换 .dark 类名
// 它默认会从 localStorage 读取 'vueuse-color-scheme'
const isDark = useDark()

// useToggle 是一个方便切换布尔值的工具函数
const toggleDark = useToggle(isDark)
</script>

<template>
    <Button variant="outline" size="icon" @click="toggleDark()">
        <span v-if="!isDark" class="text-lg">☀️</span>
        <span v-else class="text-lg">🌙</span>

        <span class="sr-only">切换主题</span>
    </Button>
</template>
