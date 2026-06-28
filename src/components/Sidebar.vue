<script setup lang="ts">
import { ref } from 'vue';
import { HomeIcon, SettingsIcon, TestTube2Icon } from '@lucide/vue'


interface Props {
  width?: number // 侧栏宽度
}

const props = withDefaults(defineProps<Props>(), {
  width: 100,
})

const sidebarWidth = ref<number>(props.width)

</script>

<template>
  <div
    class="flex flex-1 shrink-0 bg-gray-100 dark:bg-gray-600 border-r border-gray-300 transition-[width] duration-300"
    :style="{ width: `${sidebarWidth}px` }">
    <div class="w-full h-full flex flex-col overflow-hidden">
      <nav class="sidebar flex-1 p-4 text-sm space-y-2 overflow-y-auto text-black">
        <!-- a 链接 -->
        <router-link to="/" active-class="bg-sky-200/70" class="flex font-bold px-4 py-2 rounded hover:bg-gray-200">
          <HomeIcon /> <span class="ml-4">首页</span>
        </router-link>
        <router-link to="/setting" active-class=" bg-sky-200/70"
          class="flex font-bold px-4 py-2 rounded hover:bg-gray-200/50 active:bg-sky-700/80 transition-colors duration-600">
          <SettingsIcon /><span class="ml-4">设置</span>
        </router-link>
        <router-link to="uitest" active-class=" bg-sky-200/70"
          class="flex font-bold px-4 py-2 rounded hover:bg-gray-200/50 active:bg-sky-700/80 transition-colors duration-600">
          <TestTube2Icon /> <span class="ml-4">UI测试</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// .router-link-exact-active:hover {
//   background-color: rgb(186 230 253 / 0.7) !important;
// }
</style>
