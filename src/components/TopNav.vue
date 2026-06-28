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
    <div class="h-20">
        <div>
            <h2>{{ topTitle }}</h2>
        </div>
        <div>
            <router-view />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
