<script setup lang="ts">
import { ref, computed } from 'vue';

// 状态管理
const inputVal = ref<string>('');
const error = ref<string>('');

/**
 * 解析输入并返回电阻数组
 */
const resistorList = computed<number[]>(() => {
    const cleanStr = inputVal.value.replace(/，/g, ',').trim();
    if (!cleanStr) return [];
    const parts = cleanStr.split(/[,\s]+/).filter(Boolean);
    const numbers = parts.map(Number);
    if (numbers.some((n) => isNaN(n) || n < 0)) {
        return [];
    }
    return numbers;
});

/**
 * 核心计算逻辑
 */
const result = computed<string | number | null>(() => {
    const cleanStr = inputVal.value.replace(/，/g, ',').trim();

    if (!cleanStr) {
        error.value = '';
        return null;
    }

    const parts = cleanStr.split(/[,\s]+/).filter(Boolean);
    const numbers = parts.map(Number);

    // 增加负数校验，使其更符合物理现实
    if (numbers.some((n) => isNaN(n))) {
        error.value = '请输入有效的数字，用逗号或空格分隔';
        return null;
    }
    if (numbers.some((n) => n < 0)) {
        error.value = '电阻值不能为负数';
        return null;
    }

    error.value = '';

    let sumInverse = 0;
    for (const r of numbers) {
        if (r === 0) return 0; // 短路情况
        sumInverse += 1 / r;
    }

    if (sumInverse === 0) return Infinity;

    return (1 / sumInverse).toFixed(2);
});
</script>

<template>
    <div
        class="grid grid-cols-1 lg:grid-cols-12 gap-6  h-full shadow-lg border border-gray-200/70 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden rounded-xl pt-0">

        <div class="lg:col-span-5 flex flex-col">
            <div
                class="bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-slate-200 dark:border-zinc-800 flex flex-col h-full overflow-hidden transition-all hover:shadow-lg">

                <div
                    class="bg-slate-900 dark:bg-zinc-900 px-6 py-4 flex items-center gap-3 border-b border-slate-800 dark:border-zinc-800">
                    <div class="p-2 bg-emerald-500/10 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div>
                        <h1 class="text-white font-bold text-base tracking-wide">电阻并联计算器</h1>
                        <p class="text-xs text-slate-400">Parallel Resistor Calculator</p>
                    </div>
                </div>

                <div class="p-6 space-y-6 flex-1">
                    <div class="space-y-2">
                        <label for="resistor-input"
                            class="block text-sm font-semibold text-slate-700 dark:text-zinc-300">
                            请输入各个电阻值
                            <span class="text-xs text-slate-400 dark:text-zinc-500 font-normal ml-1">(单位: 欧姆 Ω)</span>
                        </label>

                        <div class="relative group">
                            <textarea id="resistor-input" v-model="inputVal" rows="3"
                                placeholder="例如: 100 220 470 或用逗号分隔: 100, 200"
                                class="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-slate-800 dark:text-zinc-100 placeholder-slate-400 text-sm resize-none"
                                autocomplete="off"></textarea>
                        </div>

                        <p v-if="error" class="text-destructive text-xs flex items-center gap-1 font-medium mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                    clip-rule="evenodd" />
                            </svg>
                            {{ error }}
                        </p>
                    </div>

                    <div v-if="resistorList.length > 0" class="space-y-2">
                        <span class="text-xs font-medium text-slate-400 dark:text-zinc-500">当前输入的阻值列表:</span>
                        <div class="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                            <span v-for="(r, idx) in resistorList" :key="idx"
                                class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700">
                                R{{ idx + 1 }} = {{ r }} Ω
                            </span>
                        </div>
                    </div>
                </div>

                <div class="p-6 bg-slate-50 dark:bg-zinc-900/50 border-t border-slate-100 dark:border-zinc-800/80">
                    <div class="flex flex-col items-center justify-center space-y-1">
                        <span
                            class="text-xs font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">等效总电阻
                            (R_total)</span>

                        <div class="flex items-baseline gap-2">
                            <span v-if="result !== null"
                                class="text-4xl font-black text-emerald-600 dark:text-emerald-500 tabular-nums tracking-tight drop-shadow-sm">
                                {{ result }}
                            </span>
                            <span v-else
                                class="text-4xl font-bold text-slate-300 dark:text-zinc-700 tabular-nums">--.--</span>

                            <span class="text-sm font-bold text-slate-600 dark:text-zinc-400">Ω</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="lg:col-span-7 flex flex-col gap-6">

            <div
                class="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-slate-200 dark:border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-6">

                <div
                    class="flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-100 dark:border-zinc-800 pb-4 md:pb-0 md:pr-6">
                    <span
                        class="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider block mb-3">电路原理图
                        (Schematic)</span>
                    <div
                        class="flex-1 flex items-center justify-center bg-slate-50 dark:bg-zinc-950 rounded-lg p-4 min-h-[140px]">
                        <svg class="w-full max-w-[200px] text-slate-600 dark:text-zinc-400" viewBox="0 0 200 120"
                            fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="10" y1="60" x2="40" y2="60" />
                            <line x1="160" y1="60" x2="190" y2="60" />
                            <circle cx="40" cy="60" r="3" class="fill-slate-600 dark:fill-zinc-400" />
                            <line x1="40" y1="20" x2="40" y2="100" />
                            <circle cx="160" cy="60" r="3" class="fill-slate-600 dark:fill-zinc-400" />
                            <line x1="160" y1="20" x2="160" y2="100" />

                            <line x1="40" y1="20" x2="75" y2="20" />
                            <rect x="75" y="12" width="50" height="16" class="fill-white dark:fill-zinc-900"
                                stroke="currentColor" stroke-width="2" />
                            <text x="100" y="24" font-size="10" text-anchor="middle" font-weight="bold"
                                class="fill-slate-700 dark:fill-zinc-300 stroke-none">R1</text>
                            <line x1="125" y1="20" x2="160" y2="20" />

                            <line x1="40" y1="60" x2="75" y2="60" />
                            <rect x="75" y="52" width="50" height="16" class="fill-white dark:fill-zinc-900"
                                stroke="currentColor" stroke-width="2" />
                            <text x="100" y="64" font-size="10" text-anchor="middle" font-weight="bold"
                                class="fill-slate-700 dark:fill-zinc-300 stroke-none">R2</text>
                            <line x1="125" y1="60" x2="160" y2="60" />

                            <line x1="40" y1="100" x2="75" y2="100" />
                            <rect x="75" y="92" width="50" height="16" class="fill-white dark:fill-zinc-900"
                                stroke="currentColor" stroke-width="2" stroke-dasharray="2 2" />
                            <text x="100" y="104" font-size="10" text-anchor="middle" font-weight="bold"
                                class="fill-slate-400 dark:fill-zinc-500 stroke-none">Rn</text>
                            <line x1="125" y1="100" x2="160" y2="100" />
                        </svg>
                    </div>
                </div>

                <div class="flex flex-col justify-between">
                    <span
                        class="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider block mb-2">数学公式
                        (Formula)</span>
                    <div
                        class="flex-1 flex flex-col justify-center space-y-3 bg-slate-50 dark:bg-zinc-950 rounded-lg p-4 font-mono text-sm text-slate-700 dark:text-zinc-300">
                        <div
                            class="p-2 bg-white dark:bg-zinc-900 rounded border border-slate-100 dark:border-zinc-800 text-center">
                            <span class="text-emerald-600 dark:text-emerald-400 font-bold">1/R_total</span> = 1/R₁ +
                            1/R₂ + ... + 1/Rₙ
                        </div>
                        <div class="text-xs text-slate-400 dark:text-zinc-500 space-y-1 font-sans">
                            <p class="font-medium text-slate-500 dark:text-zinc-400">💡 极客小常识：</p>
                            <p>• 并联后的总电阻永远比其中**任何一个最小的电阻还要小**。</p>
                            <p>• 两个相同电阻并联，总阻值直接**减半**。</p>
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-slate-200 dark:border-zinc-800 flex-1 flex flex-col">
                <span
                    class="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider block mb-4">电路特性与工程考量
                    (Pros & Cons)</span>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                    <div
                        class="bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100/60 dark:border-emerald-900/30 rounded-lg p-4 space-y-3">
                        <div class="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="2.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            并联的优势 / 工程价值
                        </div>
                        <ul
                            class="text-xs text-slate-600 dark:text-zinc-400 space-y-2 list-disc list-inside leading-relaxed">
                            <li><strong class="text-slate-800 dark:text-zinc-200">分流与扩容：</strong>将电流分散到多个电阻，能有效<span
                                    class="text-emerald-600 font-medium">降低单个电阻的功率负荷</span>，防止贴片过热。</li>
                            <li><strong
                                    class="text-slate-800 dark:text-zinc-200">凑出非标阻值：</strong>在电路微调（Tuning）中，通过并联两个标称电阻（如
                                E24 系列），可精准得到非标准阻值的电阻。</li>
                            <li><strong
                                    class="text-slate-800 dark:text-zinc-200">独立性强：</strong>各支路工作状态独立，某一条支路电阻开路（断路）时，其他支路仍能正常导通。
                            </li>
                        </ul>
                    </div>

                    <div
                        class="bg-amber-50/50 dark:bg-amber-950/10 border border-amber-100/60 dark:border-amber-900/30 rounded-lg p-4 space-y-3">
                        <div class="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="2.5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            局限性 / 避坑指南
                        </div>
                        <ul
                            class="text-xs text-slate-600 dark:text-zinc-400 space-y-2 list-disc list-inside leading-relaxed">
                            <li><strong class="text-slate-800 dark:text-zinc-200">短路致命性：</strong>只要其中任何一个电阻意外发生物理短路 (0
                                Ω)，<span class="text-amber-600 font-medium">整个并联网络将全部被短路</span>。</li>
                            <li><strong class="text-slate-800 dark:text-zinc-200">BOM 成本与空间：</strong>并联需要放置更多的元器件，会增加
                                PCB 的布线空间（Layout footprint）以及加工贴片成本。</li>
                            <li><strong
                                    class="text-slate-800 dark:text-zinc-200">总电流激增：</strong>由于总等效电阻减小，在恒压源供电下，会导致电路的总功耗和主干路电流迅速上升。
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>