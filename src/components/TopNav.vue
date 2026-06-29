<script setup lang="ts">
import { ref } from 'vue';


interface Props {
    title?: string // 顶部标题
}

const props = withDefaults(defineProps<Props>(), {
    title: '顶部标题'
})

const topTitle = ref<string>(props.title)

</script>

<template>
    <div class="mb-8">
        <div>
            <h2>{{ topTitle }}</h2>
        </div>
        <nav class="flex flex-wrap gap-x-2 bg-white p-4">
            <slot></slot>
        </nav>
    </div>
</template>

<style lang="scss" scoped></style>
