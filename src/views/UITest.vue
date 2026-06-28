<script setup lang="ts">
import TopNav from '../components/TopNav.vue';
import BadgeTest from '@/components/testfile/BadgeTest.vue';
import { HomeIcon, SettingsIcon, TestTube2Icon } from '@lucide/vue'
import { Button } from '@/components/ui/button/index.ts';

</script>

<template>
    <div>
        <TopNav title="UI 测试页面">
            <Button as-child variant="link">
                <router-link to="/uitest/badge-view" active-class="bg-sky-200/70">
                    Badge 测试
                </router-link>
            </Button>
            <Button as-child variant="link">
                <router-link to="/uitest/button-view" active-class="bg-sky-200/70">
                    Button 测试
                </router-link>
            </Button>


        </TopNav>
        <router-view />
    </div>
</template>

<style lang="scss" scoped></style>
