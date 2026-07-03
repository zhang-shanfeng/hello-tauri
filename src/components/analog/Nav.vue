<script setup lang="ts">
import { OmegaIcon, CircleGaugeIcon, ZodiacAquariusIcon, FunnelIcon, BatteryIcon } from '@lucide/vue';

</script>

<template>
    <div class="w-full">
        <!-- 工具导航区域 -->
        <div class="mb-6 border-b border-border/50 dark:border-border/20 pb-4">
            <div class="relative">
                <!-- 背景装饰元素 -->
                <div
                    class="absolute -top-4 left-0 right-0 h-12 bg-gradient-to-b from-background/50 to-background rounded-t-lg z-0" />

                <!-- 导航标题 -->
                <h2 class="text-xl font-semibold text-foreground mb-4 pl-2 relative z-10">
                    <span class="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                        模拟电路设计工具
                    </span>
                    <span class="text-muted-foreground text-sm ml-2">专业级电路计算与分析</span>
                </h2>

                <!-- 导航选项卡 -->
                <div class="relative z-10">
                    <div
                        class="flex flex-wrap items-center gap-1 bg-muted/50 dark:bg-muted/20 p-1 rounded-xl border border-border/30">
                        <!-- 电阻工具 -->
                        <router-link :to="{ name: 'resistor' }" class="zsf-nav-link" active-class="bg-sky-200/70">
                            <OmegaIcon />
                            <span>电阻计算</span>
                            <span
                                class="text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 px-2 py-0.5 rounded-full">核心</span>
                        </router-link>

                        <!-- 电容工具 -->
                        <router-link to="/analog/capacitor" class="zsf-nav-link" active-class="bg-sky-200/70">
                            <CircleGaugeIcon />
                            <span>电容计算</span>
                            <span
                                class="text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 px-2 py-0.5 rounded-full">新</span>
                        </router-link>

                        <!-- 电感工具 -->
                        <router-link to="/analog/inductor" class="zsf-nav-link" active-class="bg-sky-200/70">
                            <ZodiacAquariusIcon />
                            <span>电感线圈</span>
                        </router-link>

                        <!-- 滤波器设计 -->
                        <router-link to="/analog/filter" class="zsf-nav-link" active-class="bg-sky-200/70">
                            <FunnelIcon />
                            <span>滤波器设计</span>
                        </router-link>

                        <!-- 电源设计 -->
                        <router-link to="/analog/power" class="zsf-nav-link" active-class="bg-sky-200/70">
                            <BatteryIcon />
                            <span>电源设计</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<style scoped>
/* 添加电路板纹理背景 */
::v-deep(.nav-container) {
    background-image:
        linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px);
    background-size: 20px 20px;
}
</style>