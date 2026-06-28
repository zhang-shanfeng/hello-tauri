<!-- 电阻并联计算器
    2026/6/13
-->
<script setup>
import { ref, computed } from 'vue';

// 状态管理
const inputVal = ref('');
const error = ref('');

/**
 * 核心计算逻辑
 */
const result = computed(() => {
    // 1. 预处理：将中文逗号替换为英文逗号，去除首尾空格
    const cleanStr = inputVal.value.replace(/，/g, ',').trim();

    // 2. 如果为空，重置错误并返回空
    if (!cleanStr) {
        error.value = '';
        return null;
    }

    // 3. 分割字符串（支持逗号和空格）
    const parts = cleanStr.split(/[,\s]+/).filter(Boolean);

    // 4. 验证输入是否全为数字
    const numbers = parts.map(Number);
    if (numbers.some(isNaN)) {
        error.value = '请输入有效的数字，用逗号或空格分隔';
        return null;
    }

    // 5. 清除错误
    error.value = '';

    // 6. 并联公式计算: 1/R_total = 1/R1 + 1/R2 + ...
    let sumInverse = 0;
    for (const r of numbers) {
        if (r === 0) return 0; // 短路情况
        sumInverse += 1 / r;
    }

    if (sumInverse === 0) return Infinity;

    return (1 / sumInverse).toFixed(2); // 保留两位小数
});
</script>

<template>
    <!-- 外层背景：柔和的灰色 -->
    <div class="flex items-center h-full justify-center bg-gray-100 dark:bg-gray-600 p-4 font-sans">

        <!-- 主卡片容器 -->
        <div
            class="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-2xl">

            <!-- 顶部标题栏：深色工业风 -->
            <div class="bg-slate-800 px-6 py-4 flex items-center gap-3 border-b border-slate-700">
                <!-- 图标 -->
                <div class="p-2 bg-yellow-500/20 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-400" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <h1 class="text-white font-bold text-lg tracking-wide">电阻并联计算器</h1>
            </div>

            <!-- 内容区域 -->
            <div class="p-8 space-y-6">

                <!-- 输入组 -->
                <div class="space-y-2">
                    <label for="resistor-input" class="block text-sm font-medium text-gray-600">
                        请输入电阻值
                        <span class="text-xs text-gray-400 ml-1">(单位: 欧姆)</span>
                    </label>

                    <div class="relative group">
                        <input id="resistor-input" v-model="inputVal" type="text" placeholder="例如: 250 1000 或 250, 1000"
                            class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-gray-800 placeholder-gray-400"
                            autocomplete="off" />
                        <!-- 装饰性图标 -->
                        <div class="absolute right-3 top-3.5 text-gray-400 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                        </div>
                    </div>

                    <!-- 错误提示 -->
                    <p v-if="error" class="text-red-500 text-sm mt-1 animate-pulse">
                        {{ error }}
                    </p>
                </div>

                <!-- 结果显示区 -->
                <div class="pt-4 border-t border-dashed border-gray-200">
                    <div class="flex flex-col items-center justify-center space-y-1">
                        <span class="text-sm text-gray-500 font-medium uppercase tracking-wider">等效电阻值</span>

                        <div class="flex items-baseline gap-2">
                            <span v-if="result !== null"
                                class="text-4xl font-extrabold text-emerald-600 tabular-nums tracking-tight drop-shadow-sm">
                                {{ result }}
                            </span>
                            <span v-else class="text-4xl font-bold text-gray-300 tabular-nums">--.--</span>

                            <span class="text-lg font-medium text-gray-600">欧姆 (Ω)</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>