import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.ts";
import { createPinia } from 'pinia'

import "./style.css";

const pinia = createPinia()

// 🌟 关键：在挂载应用前，确保主题状态已恢复
// 创建一个初始化函数
const initAppTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}

// 🌟 关键：在应用挂载前执行
initAppTheme()

createApp(App).use(pinia).use(router).mount("#app");
