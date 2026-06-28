<script setup lang="ts">
import { Button } from '@/components/ui/button/index.ts';
</script>

<template>
    <div>
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
</template>

<style lang="scss" scoped></style>
