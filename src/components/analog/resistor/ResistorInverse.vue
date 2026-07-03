<script setup lang="ts">
import { ref, computed } from 'vue'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ZapIcon, HelpCircleIcon, CheckCircle2Icon } from '@lucide/vue';
// 假设你之前提取的常量基数库
import { E24_BASE, E96_BASE, E192_BASE } from './constants'
// 导入您封装的单选按钮组件
import RadioButtonGroup from '@/components/zsf_ui/RadioButtonGroup.vue'

// 1. 状态定义
const targetValueInput = ref<string>('150') // 目标阻值输入（字符串方便用户输入）
const selectedStandard = ref<string>('E96') // 电阻标准：E24, E96, E192
const selectedCount = ref<string>('2') // 电阻个数：'2' 或 '3'

// 2. 动态生成完整的标准电阻阻值列表（支持多数量级 1Ω 到 1MΩ）
const generateResistorList = (baseValues: number[]): number[] => {
    const multipliers = [1, 10, 100, 1000, 10000, 100000] // 1Ω 到 100kΩ+
    const list: number[] = []
    for (const m of multipliers) {
        for (const base of baseValues) {
            // 保留两位小数，避免浮点数精度问题
            list.push(Math.round(base * m * 100) / 100)
        }
    }
    return list.sort((a, b) => a - b)
}

// 3. 核心逆向穷举匹配算法
const matchResults = computed(() => {
    const target = parseFloat(targetValueInput.value)
    if (isNaN(target) || target <= 0) return []

    // 根据所选标准获取基础库
    let base: number[] = E24_BASE
    if (selectedStandard.value === 'E96') base = E96_BASE
    if (selectedStandard.value === 'E192') base = E192_BASE

    const candidates = generateResistorList(base)
    const count = parseInt(selectedCount.value, 10)

    let bestCombinations: Array<{ resistors: number[]; actual: number; error: number }> = []

    // 过滤掉明显过大、无法并联出目标值的单体电阻，减少非必要循环
    const validCandidates = candidates.filter(r => r > target)

    if (count === 2) {
        // 2 个电阻并联穷举法
        for (let i = 0; i < validCandidates.length; i++) {
            for (let j = i; j < validCandidates.length; j++) {
                const r1 = validCandidates[i]
                const r2 = validCandidates[j]
                const actual = 1 / (1 / r1 + 1 / r2)
                const error = ((actual - target) / target) * 100

                bestCombinations.push({
                    resistors: [r1, r2],
                    actual: Math.round(actual * 100) / 100,
                    error: Math.round(error * 1000) / 1000
                })
            }
        }
    } else if (count === 3) {
        // 3 个电阻并联穷举法
        // 为了防止 E96/E192 数量多导致单线程卡顿，这里对有效候选集做适度切片（优先选择最接近目标单体阻值的区间）
        const targetSingleEst = target * 3 // 三个相同的电阻大约是3倍目标值
        const sortedByProximity = [...validCandidates].sort((a, b) => Math.abs(a - targetSingleEst) - Math.abs(b - targetSingleEst))
        const optimizedCandidates = sortedByProximity.slice(0, 120).sort((a, b) => a - b) // 限制在120个高概率阻值内

        for (let i = 0; i < optimizedCandidates.length; i++) {
            for (let j = i; j < optimizedCandidates.length; j++) {
                for (let k = j; k < optimizedCandidates.length; k++) {
                    const r1 = optimizedCandidates[i]
                    const r2 = optimizedCandidates[j]
                    const r3 = optimizedCandidates[k]
                    const actual = 1 / (1 / r1 + 1 / r2 + 1 / r3)
                    const error = ((actual - target) / target) * 100

                    bestCombinations.push({
                        resistors: [r1, r2, r3],
                        actual: Math.round(actual * 100) / 100,
                        error: Math.round(error * 1000) / 1000
                    })
                }
            }
        }
    }

    // 按误差绝对值从小到大排序，取前 5 组最优解
    return bestCombinations
        .sort((a, b) => Math.abs(a.error) - Math.abs(b.error))
        .slice(0, 5)
})

// 新增：阻值格式化函数
const formatResistance = (value: number): string => {
    if (value >= 1000000) {
        return `${(value / 1000000).toFixed(2)}M`
    } else if (value >= 1000) {
        return `${(value / 1000).toFixed(2)}K`
    } else {
        return `${value.toFixed(2)}Ω`
    }
}

// 新增：简洁阻值格式化（不显示小数后的0）
const formatResistanceSimple = (value: number): string => {
    if (value >= 1000000) {
        const result = value / 1000000;
        return `${result % 1 === 0 ? result.toFixed(0) : result.toFixed(2)}M`;
    } else if (value >= 1000) {
        const result = value / 1000;
        return `${result % 1 === 0 ? result.toFixed(0) : result.toFixed(2)}K`;
    } else {
        return `${value.toFixed(2).replace(/\.00$/, '')}Ω`;
    }
}

// 定义选项数据（保持代码整洁）
const standardOptions = [
    { value: 'E24', label: 'E24 (5%)' },
    { value: 'E96', label: 'E96 (1%)' },
    { value: 'E192', label: 'E192 (0.1%)' }
]

const countOptions = [
    { value: '2', label: '2 个电阻并联' },
    { value: '3', label: '3 个电阻并联' }
]
</script>

<template>
    <Card
        class="w-full shadow-lg border border-gray-200/70 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden rounded-xl pt-0">
        <!-- 修复标题背景覆盖问题 -->
        <div class="bg-slate-800 dark:bg-slate-900 rounded-t-xl p-4">
            <div class="flex items-center gap-3">
                <div class="bg-emerald-500/20 p-2.5 rounded-xl border border-emerald-500/30">
                    <ZapIcon class="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                    <!-- 恢复标题内容 -->
                    <CardTitle class="text-xl font-bold text-white">
                        电阻并联逆向匹配（推荐）
                    </CardTitle>
                    <!-- 恢复描述内容 -->
                    <CardDescription class="text-slate-300 mt-0.5">
                        输入你想要的非标阻值，系统将自动从标准电阻系列中为你匹配最接近的并联组合。
                    </CardDescription>
                </div>
            </div>
        </div>

        <CardContent class="space-y-6 pt-4">
            <div class="space-y-2">
                <Label for="target-value"
                    class="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                    <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                    目标期望阻值 (Ω)
                </Label>
                <Input id="target-value" v-model="targetValueInput" type="number" placeholder="例如: 150"
                    class="w-full text-base font-mono tracking-wide border border-gray-200 dark:border-zinc-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-lg shadow-sm transition-all" />
            </div>

            <div class="space-y-2">
                <Label class="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                    <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                    采用电阻标准
                </Label>
                <!-- 使用封装的单选按钮组件替换 ToggleGroup -->
                <RadioButtonGroup v-model="selectedStandard" :options="standardOptions" name="standard" />
            </div>

            <div class="space-y-2">
                <Label class="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                    <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                    并联电阻数量
                </Label>
                <!-- 使用封装的单选按钮组件替换 ToggleGroup -->
                <RadioButtonGroup v-model="selectedCount" :options="countOptions" name="count" />
            </div>

            <div class="space-y-3 pt-3">
                <Label
                    class="text-sm font-semibold tracking-wide flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2Icon class="w-4 h-4 text-emerald-500" />
                    为您推荐的最优匹配组合：
                </Label>

                <div v-if="matchResults.length > 0" class="space-y-3">
                    <div v-for="(result, index) in matchResults" :key="index"
                        class="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-zinc-50/50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200/70 dark:border-zinc-700/50 shadow-sm hover:shadow-emerald-500/10 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-200 group">
                        <div class="flex items-center gap-3">
                            <span
                                class="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-sm">
                                {{ index + 1 }}
                            </span>
                            <div class="flex items-center gap-2 flex-wrap">
                                <template v-for="(r, rIdx) in result.resistors" :key="rIdx">
                                    <span
                                        class="font-mono bg-white dark:bg-zinc-800 px-3 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 text-sm font-bold shadow-sm transition-all">
                                        {{ formatResistanceSimple(r) }}
                                    </span>
                                    <span v-if="rIdx < result.resistors.length - 1"
                                        class="text-zinc-500 dark:text-zinc-400 text-lg font-bold">//</span>
                                </template>
                            </div>
                        </div>

                        <div class="flex items-center gap-4 mt-3 sm:mt-0 justify-between sm:justify-end text-sm">
                            <span class="text-zinc-700 dark:text-zinc-300 font-medium">
                                并联总值: <strong class="font-mono text-lg">{{ formatResistanceSimple(result.actual)
                                    }}</strong>
                            </span>
                            <span :class="[
                                'px-3 py-1 rounded-lg text-sm font-mono font-bold shadow-sm border',
                                Math.abs(result.error) <= 0.1
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-700'
                                    : Math.abs(result.error) <= 0.5
                                        ? 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/30 dark:text-sky-300 dark:border-sky-700'
                                        : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-700'
                            ]">
                                误差: {{ result.error > 0 ? '+' : '' }}{{ result.error }}%
                            </span>
                        </div>
                    </div>
                </div>

                <Alert v-else variant="destructive"
                    class="bg-zinc-50/50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 border border-zinc-200/70 dark:border-zinc-700/50">
                    <HelpCircleIcon class="h-4 w-4 text-emerald-500" />
                    <AlertDescription class="text-sm font-medium">
                        请输入合法的大于 0 的期望阻值进行逆向匹配推荐。
                    </AlertDescription>
                </Alert>
            </div>
        </CardContent>
    </Card>
</template>