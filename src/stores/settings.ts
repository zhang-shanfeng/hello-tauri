// stores/settings.ts
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useSettingsStore = defineStore('settings', () => {
    // 从 localStorage 读取初始值，或使用系统偏好
    const getInitialDarkMode = () => {
        const saved = localStorage.getItem('theme')
        if (saved === 'dark' || saved === 'light') {
            return saved === 'dark'
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    const isDark = ref(getInitialDarkMode())

    // 初始化时设置 html 类名
    if (isDark.value) {
        document.documentElement.classList.add('dark')
    }

    // 监听 isDark 变化，同步到 html 和 localStorage
    watch(isDark, (newVal) => {
        if (newVal) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }

        // 可选：触发全局事件
        window.dispatchEvent(new CustomEvent('theme-change', {
            detail: newVal ? 'dark' : 'light'
        }))
    })

    // 切换主题
    const toggleDark = () => {
        isDark.value = !isDark.value
    }

    // 设置主题
    const setDarkMode = (value: boolean) => {
        isDark.value = value
    }

    return {
        isDark,
        toggleDark,
        setDarkMode,
        // 其他设置状态...
    }
})