<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '../ui/label';
</script>
<template>
    <Input type="email" placeholder="Email" />
    <Input type="password" />
    <Input disabled type="email" placeholder="Email" />
    <div class="grid w-full max-w-sm items-center gap-1.5">
        <Label for="email">Email</Label>
        <Input id="email" type="email" placeholder="Email" />
    </div>
</template>