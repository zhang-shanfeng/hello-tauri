<template>
    <div class="flex h-screen w-full p-4 space-x-4">
        <!-- 模拟侧边栏 -->
        <div class="w-64 space-y-4">
            <Skeleton class="h-8 w-full" />
            <Skeleton class="h-8 w-3/4" />
            <Skeleton class="h-8 w-5/6" />
        </div>

        <!-- 模拟主内容区 -->
        <div class="flex-1 space-y-4">
            <Skeleton class="h-10 w-1/3" />
            <div class="grid grid-cols-3 gap-4">
                <Skeleton class="h-32 w-full" />
                <Skeleton class="h-32 w-full" />
                <Skeleton class="h-32 w-full" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Skeleton } from "@/components/ui/skeleton";
</script>
