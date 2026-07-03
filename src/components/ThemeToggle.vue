<script setup lang="ts">
import { computed } from 'vue';
import { Button } from '@/components/ui/button' // 引入你的 shadcn 按钮
import { useSettingsStore } from '@/stores';

const settingsStore = useSettingsStore()

const isDark = computed(() => settingsStore.isDark)
const toggleDark = settingsStore.toggleDark

</script>

<template>
    <Button variant="outline" size="icon" @click="toggleDark()">
        <span v-if="!isDark" class="text-lg">☀️</span>
        <span v-else class="text-lg">🌙</span>

        <span class="sr-only">切换主题</span>
    </Button>
</template>
