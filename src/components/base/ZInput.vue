<script setup lang="ts">

import { ref } from 'vue';

const model = defineModel<string>();

interface Props {
    placeholder?: string;
    type?: string;
    rules?: Array<{ validate: (val: string) => boolean; message: string }>;
}

const props = withDefaults(defineProps<Props>(), {
    placeholder: '请输入内容...',
    type: 'text',
    rules: () => []
})

const errorMessage = ref('')

const handleBlur = () => {
    for (const rule of props.rules) {
        if (!rule.validate(model.value || '')) {
            errorMessage.value = rule.message;
            return;
        }
    }
    errorMessage.value = ''
}
</script>

<template>
    <div class="my-input-wrapper mb-4">
        <input v-model="model" :type="type" :placeholder="placeholder" class="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl 
             text-slate-900 placeholder:text-slate-400 
             focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 
             transition-all duration-150" @blur="handleBlur" />
        <p v-if="errorMessage" class="mt-1 text-sm text-red-500">{{ errorMessage }}</p>
    </div>
</template>

<style lang="scss" scoped></style>
