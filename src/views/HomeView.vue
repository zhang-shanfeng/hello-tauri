<script setup lang="ts">

import { ref } from 'vue';
import ResistorDoublesCalculator from '@/components/ResistorDoublesCalculator.vue';
import TopNav from '../components/TopNav.vue';
import Counter from '../components/Counter.vue';

const count = ref(0)

function increaseCount(n: number) {
  count.value += n;
}

</script>

<template>

  <div id="home" class="flex flex-col h-full">
    <TopNav title="首页" />
    <Counter :start-num="10" class="flex flex-col justify-center" @some-event="increaseCount" />
    <div>
      {{ count }}
    </div>
    <ResistorDoublesCalculator />
  </div>

</template>

<style lang="scss" scoped></style>
