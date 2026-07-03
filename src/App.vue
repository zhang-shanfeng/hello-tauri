<script setup lang="ts">
// import { ref } from "vue";
// import { invoke } from "@tauri-apps/api/core";
// import Sidebar from "./components/Sidebar.vue";
import Sidebar2 from "./components/Sidebar2.vue";

import 'vue-sonner/style.css'
import { Toaster } from '@/components/ui/sonner'

// const greetMsg = ref("");
// const name = ref("");

// async function greet() {
//     // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
//     greetMsg.value = await invoke("greet", { name: name.value });
// }
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
