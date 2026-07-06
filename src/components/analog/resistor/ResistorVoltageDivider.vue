<script setup lang="ts">
/**************************************************************
 * 电阻串联分压器计算
 **************************************************************
 */
import CardFeatureHeader from "@/components/zsf_ui/CardFeatureHeader.vue";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ref, computed, watch } from "vue";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

import ResistorVoltageDividerSvg from "./ResistorVoltageDividerSvg.vue";

// 输入状态
const vin = ref<number>(12);
const displayR1 = ref<number>(10);
const displayR2 = ref<number>(10);

const r1Unit = ref<string>("KΩ"); // 通常电阻默认用 KΩ 更合理
const r2Unit = ref<string>("KΩ");

const targetVout = ref<number>(5);
const targetVoutError = ref<boolean>(false);
const targetVoutErrorText = ref<string>("");

const isComputedResistor = ref<boolean>(false); // false 计算输出电压，true 计算分压电阻值
const resistorLockedSelectValue = ref<string>("r1");

const UNIT_MULTIPLIER: Record<string, number> = {
    Ω: 1,
    KΩ: 1_000,
    MΩ: 1_000_000,
};

// 根据参数单位，返回对应的 Ω 值
const paresResistor1 = (unit: string): number => {
    return displayR1.value * (UNIT_MULTIPLIER[unit] || 1);
};

const paresResistor2 = (unit: string): number => {
    return displayR2.value * (UNIT_MULTIPLIER[unit] || 1);
};

/**
 * 将电压（单位：V）转换为合适的工程单位字符串
 * @param voltageInV 以 V 为单位的电压值
 * @returns 格式化后的字符串，如 "4.70mV" 或 "12.00V"
 */
const formatVoltage = (voltageInV: number): string => {
    if (voltageInV === 0) return "0V";

    // 取绝对值进行判断，防止负数影响单位选择
    const absVoltage = Math.abs(voltageInV);

    if (absVoltage < 0.001) {
        // 小于 1mV，转换为 uV (乘以 1,000,000)

        return (voltageInV * 1_000_000).toFixed(2) + "uV";
    } else if (absVoltage < 1) {
        // 大于等于 1mV 且小于 1V，转换为 mV (乘以 1,000)

        return (voltageInV * 1_000).toFixed(2) + "mV";
    } else if (absVoltage < 1000) {
        // 大于等于 1V 且小于 1kV，保持 V

        return voltageInV.toFixed(2) + "V";
    } else {
        // 大于等于 1kV，转换为 kV (除以 1,000)

        return (voltageInV / 1_000).toFixed(2) + "kV";
    }
};

/**
 * 将电流（单位：A）转换为合适的工程单位字符串
 * @param currentInA 以 A（安培）为单位的电流值
 * @returns 格式化后的字符串，如 "4.70mA" 或 "12.00uA"
 */
const formatCurrent = (currentInA: number): string => {
    if (currentInA === 0) return "0A";

    // 取绝对值进行判断，防止负数影响单位选择
    const absCurrent = Math.abs(currentInA);

    if (absCurrent < 1e-9) {
        // 小于 1nA，转换为 pA (乘以 1,000,000,000,000)
        return (currentInA * 1e12).toFixed(2) + "pA";
    } else if (absCurrent < 1e-3) {
        // 大于等于 1pA 且小于 1mA，转换为 uA (乘以 1,000,000)
        return (currentInA * 1e6).toFixed(2) + "uA";
    } else if (absCurrent < 1) {
        // 大于等于 1mA 且小于 1A，转换为 mA (乘以 1,000)
        return (currentInA * 1e3).toFixed(2) + "mA";
    } else if (absCurrent < 1000) {
        // 大于等于 1A 且小于 1kA，保持 A
        return currentInA.toFixed(2) + "A";
    } else {
        // 大于等于 1kA，转换为 kA (除以 1,000)
        return (currentInA / 1e3).toFixed(2) + "kA";
    }
};

// 计算输出电压结果
const calculatedVout = computed(() => {
    if (displayR1.value + displayR2.value === 0) return 0;

    let r1Value = paresResistor1(r1Unit.value);
    let r2Value = paresResistor2(r2Unit.value);

    let result = vin.value * (r2Value / (r1Value + r2Value));

    return formatVoltage(result);
});

const currentI = computed(() => {
    let r1Value = paresResistor1(r1Unit.value);
    let r2Value = paresResistor2(r2Unit.value);
    const totalR = r1Value + r2Value;
    if (totalR === 0) return 0;
    return formatCurrent(vin.value / totalR); // 单位安培A
});

const calculateResistors = (changedField: "r1" | "r2" | "vout") => {
    // 如果不是反向计算模式，直接返回
    if (!isComputedResistor.value) return;

    const vout = targetVout.value;

    if (vout >= vin.value) {
        targetVoutError.value = true;
        targetVoutErrorText.value = "输出电压不能大于 Vin";
    } else if (targetVout.value <= 0) {
        targetVoutError.value = true;
        targetVoutErrorText.value = "输出电压不能小于0";
    } else {
        targetVoutError.value = false;
    }

    // 核心计算逻辑
    if (resistorLockedSelectValue.value === "r2") {
        // 计算 R2 的阻值
        if (changedField === "r1" || changedField === "vout") {
            // 1. 计算出欧姆值
            let r2RawValue = 0;

            // 判断 R1 的单位

            if (r1Unit.value === "MΩ") {
                r2RawValue =
                    (displayR1.value * 1_000_000 * vout) / (vin.value - vout);
            } else if (r1Unit.value === "KΩ") {
                r2RawValue =
                    (displayR1.value * 1_000 * vout) / (vin.value - vout);
            } else {
                r2RawValue = (displayR1.value * vout) / (vin.value - vout);
            }

            // 2. 根据 R2 当前的单位，将计算出的欧姆值“反向”转换为对应的显示值
            // if (r2Unit.value === "MΩ") {
            //     displayR2.value = rawValue / 1_000_000;
            // } else if (r2Unit.value === "KΩ") {
            //     displayR2.value = rawValue / 1_000;
            // } else {
            //     displayR2.value = rawValue; // Ω
            // }

            if (r2RawValue >= 1_000_000) {
                r2Unit.value = "MΩ";
                displayR2.value = r2RawValue / 1_000_000;
            } else if (r2RawValue >= 1_000) {
                r2Unit.value = "KΩ";
                displayR2.value = r2RawValue / 1_000;
            } else if (r2RawValue < 1_000) {
                r2Unit.value = "Ω";
                displayR2.value = r2RawValue;
            }
            console.log("r2RawValue " + r2RawValue);
        }
    } else {
        // 计算 R1 的阻值
        if (changedField === "r2" || changedField === "vout") {
            let r1RawValue = 0;

            // 判断 R2 的单位
            if (r2Unit.value === "MΩ") {
                // 还原单位为 Ω
                r1RawValue =
                    (displayR2.value * 1_000_000 * (vin.value - vout)) / vout;
            } else if (r2Unit.value === "KΩ") {
                r1RawValue =
                    (displayR2.value * 1_000 * (vin.value - vout)) / vout;
            } else {
                r1RawValue = (displayR2.value * (vin.value - vout)) / vout;
            }

            // 同理，根据 R1 的单位调整显示值
            // if (r1Unit.value === "MΩ") {
            //     displayR1.value = rawValue / 1_000_000;
            // } else if (r1Unit.value === "KΩ") {
            //     displayR1.value = rawValue / 1_000;
            // } else {
            //     displayR1.value = rawValue;
            // }

            if (r1RawValue >= 1_000_000) {
                r1Unit.value = "MΩ";
                displayR1.value = r1RawValue / 1_000_000;
            } else if (r1RawValue >= 1_000) {
                r1Unit.value = "KΩ";
                displayR1.value = r1RawValue / 1_000;
            } else if (r1RawValue < 1_000) {
                r1Unit.value = "Ω";
                displayR1.value = r1RawValue;
            }
            console.log("r1RawValue " + r1RawValue);
        }
    }
};

// 监听开关，并在组件初始化时立即执行一次
watch(
    isComputedResistor,
    (newValue) => {
        if (newValue) {
            calculateResistors("r2");
        }
    },
    { immediate: true }, // <--- 加上这个配置
);
</script>

<template>
    <Card
        class="flex flex-col max-h-[70vh] w-full shadow-lg border border-gray-200/70 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl pt-0"
    >
        <CardFeatureHeader
            title="电阻串联分压计算"
            description="输入你想要的非标阻值，系统将自动从标准电阻系列中为你匹配最接近的并联组合。"
        />

        <CardContent class="space-y-6 overflow-y-auto">
            <!-- 1. 交互式计算区域 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                    class="flex flex-col space-y-2 rounded-xl shadow-md border border-slate-200 dark:border-zinc-800 p-4"
                >
                    <div class="space-y-2">
                        <Label for="vin" class="zsf-form-label"
                            >输入电压 (V<sub>in</sub>)</Label
                        >
                        <Input
                            id="vin"
                            v-model.number="vin"
                            type="number"
                            placeholder="例如: 12"
                            min="0.1"
                            step="0.1"
                            class="zsf-input-text"
                        />
                    </div>
                    <div class="space-y-2">
                        <Label for="r1" class="zsf-form-label"
                            >电阻 R1 ({{ r1Unit }})</Label
                        >

                        <Input
                            id="r1"
                            v-model.number="displayR1"
                            @input="calculateResistors('r1')"
                            type="number"
                            placeholder="例如: 10000"
                            class="zsf-input-text"
                            :disabled="
                                isComputedResistor &&
                                resistorLockedSelectValue === 'r1'
                            "
                        />
                        <!-- 单位选择器 -->
                        <RadioGroup
                            v-model="r1Unit"
                            class="flex flex-row space-x-1"
                            @update:modelValue="calculateResistors('r1')"
                        >
                            <div class="flex items-center">
                                <RadioGroupItem
                                    value="Ω"
                                    id="r1_ohm"
                                    :disabled="
                                        isComputedResistor &&
                                        resistorLockedSelectValue === 'r1'
                                    "
                                />
                                <Label for="r1_ohm" class="text-xs">Ω</Label>
                            </div>
                            <div class="flex items-center">
                                <RadioGroupItem
                                    value="KΩ"
                                    id="r1_k"
                                    :disabled="
                                        isComputedResistor &&
                                        resistorLockedSelectValue === 'r1'
                                    "
                                />
                                <Label for="r1_k" class="text-xs">KΩ</Label>
                            </div>
                            <div class="flex items-center">
                                <RadioGroupItem
                                    value="MΩ"
                                    id="r1_m"
                                    :disabled="
                                        isComputedResistor &&
                                        resistorLockedSelectValue === 'r1'
                                    "
                                />
                                <Label for="r1_m" class="text-xs">MΩ</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div class="space-y-2">
                        <Label for="r2" class="zsf-form-label"
                            >电阻 R2 ({{ r2Unit }})</Label
                        >

                        <Input
                            id="r2"
                            v-model.number="displayR2"
                            @input="calculateResistors('r2')"
                            type="number"
                            placeholder="例如: 10000"
                            class="zsf-input-text"
                            :disabled="
                                isComputedResistor &&
                                resistorLockedSelectValue === 'r2'
                            "
                        />
                        <!-- 单位选择器 -->
                        <RadioGroup
                            v-model="r2Unit"
                            class="flex flex-row space-x-1"
                            @update:modelValue="calculateResistors('r2')"
                        >
                            <div class="flex items-center">
                                <RadioGroupItem
                                    value="Ω"
                                    id="r2_ohm"
                                    :disabled="
                                        isComputedResistor &&
                                        resistorLockedSelectValue === 'r2'
                                    "
                                />
                                <Label for="r2_ohm" class="text-xs">Ω</Label>
                            </div>
                            <div class="flex items-center">
                                <RadioGroupItem
                                    value="KΩ"
                                    id="r2_k"
                                    :disabled="
                                        isComputedResistor &&
                                        resistorLockedSelectValue === 'r2'
                                    "
                                />
                                <Label for="r2_k" class="text-xs">KΩ</Label>
                            </div>
                            <div class="flex items-center">
                                <RadioGroupItem
                                    value="MΩ"
                                    id="r2_m"
                                    :disabled="
                                        isComputedResistor &&
                                        resistorLockedSelectValue === 'r2'
                                    "
                                />
                                <Label for="r2_m" class="text-xs">MΩ</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
                <!-- 控制区 Card -->
                <Card
                    class="rounded-xl shadow-md border border-slate-200 dark:border-zinc-800 pt-0"
                >
                    <CardFeatureHeader
                        title="控制区域"
                        description="通过开关按钮打开反向逆算分压电阻值功能"
                    />
                    <CardContent class="space-y-2">
                        <div class="flex items-center space-x-2">
                            <!-- 控制开关 -->
                            <Switch
                                id="airplane-mode"
                                v-model="isComputedResistor"
                            />
                            <Label for="airplane-mode"
                                >逆向计算电阻值 {{ isComputedResistor }}</Label
                            >
                        </div>
                        <Separator />
                        <div
                            class="space-y-2"
                            :class="{ 'opacity-70': !isComputedResistor }"
                        >
                            <div class="space-y-2">
                                <Label for="r2" class="zsf-form-label"
                                    >目标输出电压（v）</Label
                                >
                                <Input
                                    id="r2"
                                    v-model.number="targetVout"
                                    @input="calculateResistors('vout')"
                                    type="number"
                                    :max="vin"
                                    step="0.01"
                                    class="zsf-input-text"
                                    :disabled="!isComputedResistor"
                                />
                                <small
                                    v-if="targetVoutError"
                                    class="error-text"
                                    >{{ targetVoutErrorText }}</small
                                >
                            </div>
                            <Separator />
                            <div class="space-y-2">
                                <span class="zsf-form-label"
                                    >先择要计算哪个电阻？{{
                                        resistorLockedSelectValue
                                    }}</span
                                >
                                <RadioGroup
                                    default-value="r1"
                                    class="flex flex-row space-x-8 border border-slate-300 p-4 rounded-lg"
                                    v-model="resistorLockedSelectValue"
                                >
                                    <div class="flex items-center space-x-2">
                                        <RadioGroupItem
                                            id="radio-r1"
                                            value="r1"
                                            :disabled="!isComputedResistor"
                                        />
                                        <Label for="radio-r1">计算R1</Label>
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <RadioGroupItem
                                            id="radio-r2"
                                            value="r2"
                                            :disabled="!isComputedResistor"
                                        />
                                        <Label for="radio-r2">计算R2</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <!-- 计算结果展示 -->
            <div class="p-2 flex flex-wrap flex-col gap-2">
                <Badge variant="default" class="text-2xl min-w-56"
                    >Vin: <span class="text-green-400">{{ vin }}V</span></Badge
                >
                <Badge variant="default" class="text-2xl min-w-56"
                    >Vout:
                    <span class="text-green-400">{{
                        calculatedVout
                    }}</span></Badge
                >

                <Badge class="text-2xl min-w-56"
                    >I:
                    <span class="text-green-400">{{ currentI }}</span>
                </Badge>

                <Badge class="text-2xl min-w-56"
                    >R1:
                    <span class="text-green-400"
                        >{{ displayR1.toFixed(4) }}{{ r1Unit }}</span
                    >
                </Badge>

                <Badge class="text-2xl min-w-56"
                    >R1:
                    <span class="text-green-400"
                        >{{ displayR2.toFixed(4) }}{{ r2Unit }}</span
                    >
                </Badge>
            </div>

            <Separator class="bg-slate-300" />

            <ResistorVoltageDividerSvg />
        </CardContent>
    </Card>
</template>

<style lang="scss" scoped></style>
