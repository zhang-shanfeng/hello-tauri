<script setup lang="ts">
import type { SliderRootEmits, SliderRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/lib/utils"

interface Props extends SliderRootProps {
  class?: HTMLAttributes['class']
  trackClass?: HTMLAttributes['class'] // 新增：支持自定义未激活轨道样式
  rangeClass?: HTMLAttributes['class'] // 新增：支持自定义激活条样式
  thumbClass?: HTMLAttributes['class'] // 新增：支持自定义滑块样式
}

const props = withDefaults(defineProps<Props>(), {
  trackClass: 'bg-gray-500',
  rangeClass: 'bg-green-500',
  thumbClass: 'border-blue-500'
})


const emits = defineEmits<SliderRootEmits>()

// const delegatedProps = reactiveOmit(props, "class")

// 过滤掉自定义的样式字段，只把原生的 slider 属性和 root 的 class 传给 SliderRoot
const delegatedProps = computed(() => {
  const { class: _, trackClass, rangeClass, thumbClass, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <SliderRoot v-slot="{ modelValue }" data-slot="slider"
    :class="cn('relative flex w-full touch-none select-none items-center data-[disabled]:opacity-50', props.class)"
    v-bind="forwarded">
    <SliderTrack data-slot="slider-track"
      :class="cn('relative h-1.5 w-full grow overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800', props.trackClass)">
      <SliderRange data-slot="slider-range" :class="cn('absolute h-full', props.rangeClass)" />
    </SliderTrack>

    <SliderThumb v-for="(_, key) in modelValue" :key="key" data-slot="slider-thumb" :class="cn('block h-5 w-5 rounded-full bg-white shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
      'hover:bg-blue-500 focus:ring-2 focus:ring-blue-300', // 悬浮时向外辐射一个 4px 宽、带透明度的标准品牌色光圈
      props.thumbClass)" />
  </SliderRoot>
</template>
