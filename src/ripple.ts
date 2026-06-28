import type { Directive } from 'vue';

export const rippleDirective: Directive<HTMLElement> = {
  mounted(el: HTMLElement) {
    // 确保父元素有相对定位和溢出隐藏，否则波纹会飞出去
    el.classList.add('relative', 'overflow-hidden');

    el.addEventListener('click', (e: MouseEvent) => {
      // 1. 计算鼠标点击相对于当前元素的位置
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      // 2. 创建波纹 DOM 元素
      const ripple = document.createElement('span');

      // 3. 使用 Tailwind CSS 赋予初始样式和动画
      ripple.className = 'absolute rounded-full bg-white/40 pointer-events-none animate-ripple';

      // 4. 设置大小和位置
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      // 5. 插入并定时销毁
      el.appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 600); // 这里的 600ms 需要和 Tailwind v4 中的动画时间对应
    });
  }
};