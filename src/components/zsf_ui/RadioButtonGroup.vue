<!-- RadioButtonGroup.vue -->
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    modelValue: { type: String, required: true },
    options: {
        type: Array as () => Array<{ value: string; label: string }>,
        required: true
    },
    name: { type: String, required: true }
})

const emit = defineEmits(['update:modelValue'])

const selectedValue = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})
</script>

<template>
    <div class="flex flex-wrap gap-3">
        <div v-for="option in options" :key="option.value" class="relative flex items-center group">
            <input type="radio" :id="`${name}-${option.value}`" :name="name" v-model="selectedValue"
                :value="option.value" class="absolute opacity-0 cursor-pointer peer w-full h-full z-10">
            <label :for="`${name}-${option.value}`" class="relative flex items-center justify-center h-11 px-4 rounded-lg border-2 border-gray-200 dark:border-zinc-700 cursor-pointer transition-all duration-200
            peer-checked:border-emerald-500 peer-checked:bg-emerald-50 peer-checked:text-emerald-700
            hover:border-emerald-400 hover:bg-emerald-50/50
            dark:peer-checked:bg-emerald-900/30 dark:peer-checked:text-emerald-300
            dark:hover:border-emerald-500 dark:hover:bg-emerald-900/20">
                <span class="text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors duration-200">
                    {{ option.label }}
                </span>
                <div
                    class="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold opacity-0 peer-checked:opacity-100 transition-opacity duration-200">
                    ✓
                </div>
            </label>
        </div>
    </div>
</template>