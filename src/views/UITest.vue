<script setup lang="ts">
import TopNav from '../components/TopNav.vue';
// 引入 buttonVariants 工具
import { buttonVariants } from '@/components/ui/button'

</script>

<template>
    <div>
        <TopNav title="UI 测试页面">
            <router-link :to="{ name: 'badge-view' }" :class="buttonVariants({ variant: 'link', size: 'default' })"
                active-class="bg-sky-200/70">
                Badge 测试
            </router-link>
            <router-link :to="{ name: 'button-view' }" :class="buttonVariants({ variant: 'link', size: 'default' })"
                active-class="bg-sky-200/70">
                Button 测试
            </router-link>
            <router-link :to="{ name: 'combobox-view' }" :class="buttonVariants({ variant: 'link', size: 'default' })"
                active-class="bg-sky-200/70">
                Combobox 测试
            </router-link>
            <router-link :to="{ name: 'separator-view' }" :class="buttonVariants({ variant: 'link', size: 'default' })"
                active-class="bg-sky-200/70">
                Separator 测试
            </router-link>
            <router-link :to="{ name: 'checkbox-view' }" :class="buttonVariants({ variant: 'link', size: 'default' })"
                active-class="bg-sky-200/70">
                Checkbox 测试
            </router-link>
            <router-link :to="{ name: 'input-view' }" :class="buttonVariants({ variant: 'link', size: 'default' })"
                active-class="bg-sky-200/70">
                Input 测试
            </router-link>
            <router-link :to="{ name: 'textarea-view' }" :class="buttonVariants({ variant: 'link', size: 'default' })"
                active-class="bg-sky-200/70">
                Textarea 测试
            </router-link>
            <router-link :to="{ name: 'switch-view' }" :class="buttonVariants({ variant: 'link', size: 'default' })"
                active-class="bg-sky-200/70">
                Switch 测试
            </router-link>
            <router-link :to="{ name: 'slider-view' }" :class="buttonVariants({ variant: 'link', size: 'default' })"
                active-class="bg-sky-200/70">
                Slider 测试
            </router-link>
            <router-link :to="{ name: 'radio-group-view' }"
                :class="buttonVariants({ variant: 'link', size: 'default' })" active-class="bg-sky-200/70">
                RadioGroup 测试
            </router-link>
            <router-link :to="{ name: 'scroll-area-view' }"
                :class="buttonVariants({ variant: 'link', size: 'default' })" active-class="bg-sky-200/70">
                ScrollArea 测试
            </router-link>
            <router-link :to="{ name: 'select-view' }" :class="buttonVariants({ variant: 'link', size: 'default' })"
                active-class="bg-sky-200/70">
                Select 测试
            </router-link>
        </TopNav>
        <router-view />
    </div>
</template>

<style lang="scss" scoped></style>
