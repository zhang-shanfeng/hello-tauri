<script setup lang="ts">
import { Button } from '@/components/ui/button/index.ts';
</script>

<template>
    <div class="flex flex-col items-center gap-2 bg-emerald-600/70 p-4">
        <div>
            <h2>Button 测试</h2>
        </div>
        <div class="flex gap-2 w-full flex-wrap">
            <Button>default</Button>
            <Button variant="outline">outline</Button>
            <Button variant="secondary">secondary</Button>
            <Button variant="destructive">
                destructive
            </Button>
            <Button variant="link">
                Link
            </Button>

            <Button variant="success">
                Success
            </Button>
            <Button variant="info">
                Info
            </Button>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
