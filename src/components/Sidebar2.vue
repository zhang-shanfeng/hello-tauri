<script setup lang="ts">
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger
} from './ui/sidebar';
import { HomeIcon, SettingsIcon, TestTube2Icon, AudioLinesIcon } from '@lucide/vue';
</script>

<template>
    <SidebarProvider>
        <Sidebar>
            <!-- SidebarHead -->
            <SidebarHead>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg">
                            <div
                                class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                <GalleryVerticalEnd class="size-4" />
                            </div>
                            <div class="grid flex-1 text-left text-sm leading-tight">
                                <span class="truncate font-semibold">Acme Inc</span>
                                <span class="truncate text-xs">Enterprise</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHead>
            <!-- SidebarContent -->
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Platform</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton as-child>
                                    <router-link to="/" active-class="bg-sky-200/70"
                                        class="flex font-bold px-4 py-2 rounded hover:bg-gray-200">
                                        <HomeIcon /> <span class="ml-4">首页</span>
                                    </router-link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton as-child>
                                    <router-link to="/analog" active-class=" bg-sky-200/70"
                                        class="flex font-bold px-4 py-2 rounded hover:bg-gray-200/50 active:bg-sky-700/80 transition-colors duration-600">
                                        <AudioLinesIcon /><span class="ml-4">模电工具</span>
                                    </router-link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton as-child>
                                    <router-link to="/setting" active-class=" bg-sky-200/70"
                                        class="flex font-bold px-4 py-2 rounded hover:bg-gray-200/50 active:bg-sky-700/80 transition-colors duration-600">
                                        <SettingsIcon /><span class="ml-4">设置</span>
                                    </router-link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton as-child>
                                    <router-link to="/uitest" active-class=" bg-sky-200/70"
                                        class="flex font-bold px-4 py-2 rounded hover:bg-gray-200/50 active:bg-sky-700/80 transition-colors duration-600">
                                        <TestTube2Icon /> <span class="ml-4">UI测试</span>
                                    </router-link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <!-- SidebarFooter -->
            <SidebarFooter />
            <!-- SidebarRail -->
            <SidebarRail />
        </Sidebar>
        <!-- SidebarInset -->
        <!-- <SidebarInset>
            <header
                class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div class="flex items-center gap-2 px-4">
                    <SidebarTrigger class="-ml-1" />
                </div>
            </header>
            <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div class="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div class="aspect-video rounded-xl bg-muted/50" />
                    <div class="aspect-video rounded-xl bg-muted/50" />
                    <div class="aspect-video rounded-xl bg-muted/50" />
                </div>
                <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
            </div>
        </SidebarInset> -->
    </SidebarProvider>
</template>

<style lang="scss" scoped></style>
