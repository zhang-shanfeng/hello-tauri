<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ResistorForward from './ResistorForward.vue';
import ResistorInverse from './ResistorInverse.vue';
import ResistorVoltageDivider from './ResistorVoltageDivider.vue';
</script>

<template>
    <div class="p-6 max-w-6xl mx-auto space-y-6">
        <div class="flex flex-col gap-1">
            <h2 class="text-2xl font-bold tracking-tight">电阻设计工程套件</h2>
            <p class="text-sm text-muted-foreground">
                提供高效的正向并联等效阻值计算，以及基于 E24 / E96 / E192 精度标准的阻值逆向最优匹配推荐。
            </p>
        </div>

        <Tabs default-value="forward" class="w-full">
            <TabsList class="grid w-full grid-cols-3 max-w-[400px]">
                <TabsTrigger value="forward">
                    正向并联计算
                </TabsTrigger>
                <TabsTrigger value="inverse">
                    逆向智能匹配
                </TabsTrigger>
                <TabsTrigger value="voltage-divider">
                    电阻分压器计算
                </TabsTrigger>
            </TabsList>

            <TabsContent value="forward" class="mt-4">
                <ResistorForward />
            </TabsContent>

            <TabsContent value="inverse" class="mt-4">
                <ResistorInverse />
            </TabsContent>

            <TabsContent value="voltage-divider" class="mt-4 mb-4">
                <ResistorVoltageDivider />
            </TabsContent>
        </Tabs>
    </div>
</template>
