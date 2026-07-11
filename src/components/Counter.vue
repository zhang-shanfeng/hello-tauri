<script setup lang="ts">
import { ref } from "vue";
import ZInput from "./base/ZInput.vue";
import { Button } from "./ui/button/index.ts";

interface Props {
    startNum?: number;
}

const props = withDefaults(defineProps<Props>(), {
    startNum: 0,
});

const count = ref(props.startNum);
const username = ref("");

// const title = defineModel('title')
</script>

<template>
    <div :class="$attrs.class">
        <Button @click="count++">{{ count }}</Button>
        <div>
            <Button @click="$emit('someEvent', count)">Click Me</Button>
        </div>
        <div class="p-2">
            <ZInput
                v-model="username"
                placeholder="请输入搜索关键字"
                :rules="[
                    {
                        validate: (val) => val.length > 0,
                        message: '用户名不能为空',
                    },
                ]"
            />
            <p>{{ username }}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
