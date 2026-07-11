<script setup lang="ts">
import { onMounted, nextTick } from "vue";

import { getCurrentWindow } from "@tauri-apps/api/window";

import Sidebar2 from "./components/Sidebar2.vue";

import "vue-sonner/style.css";
import { Toaster } from "@/components/ui/sonner";

onMounted(async () => {
    const appWindow = getCurrentWindow();

    // 1. 等待 Vue 完成所有的 DOM 更新（即所有常规组件都渲染完毕）
    await nextTick();

    // 2. 此时页面上的骨架屏或首屏内容已经稳稳地画在屏幕上了
    // 安全地显示窗口，用户看到的是完整的界面，没有任何白屏
    await appWindow.show();
});
</script>

<template>
    <!-- flex 布局 -->
    <div class="flex w-full h-full bg-gray-50 dark:bg-gray-500/10">
        <div class="flex flex-col">
            <!-- <Sidebar :width="200" /> -->
            <Sidebar2 />
        </div>
        <main class="flex-1 bg-gray-100 dark:bg-gray-600">
            <!-- 路由视图 -->
            <router-view />
        </main>
        <Toaster />
    </div>
</template>

<style scoped></style>
