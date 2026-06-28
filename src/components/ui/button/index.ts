import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Button } from "./Button.vue"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        // 2. 优化默认变体 (default)：加入 hover 颜色加深，active 瞬间变深，松开缓缓恢复
        default:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:bg-primary/70',

        // 3. 优化次要变体 (secondary)
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 active:bg-secondary/60',

        // 4. 优化破坏性变体 (destructive)
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:bg-destructive/70',

        // 5. 优化边框变体 (outline)：点击时背景有优雅的浅色高亮淡出
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground active:bg-accent/80',

        // 6. 优化幽灵变体 (ghost)
        ghost:
          'hover:bg-accent hover:text-accent-foreground active:bg-accent/80',

        link:
          'text-primary underline-offset-4 hover:underline',

        // ✨ 1. 新增：成功状态 (绿色)
        success:
          'bg-emerald-600 text-white shadow-sm hover:bg-emerald-500 active:bg-emerald-700 dark:bg-emerald-600/50 dark:text-white dark:shadow-sm dark:hover:bg-emerald-500 dark:active:bg-emerald-700',

        // ✨ 2. 新增：警告状态 (橙色)
        warning:
          'bg-amber-500 text-white shadow-sm hover:bg-amber-400 active:bg-amber-600',

        // ✨ 3. 新增：信息状态 (蓝色)
        info:
          'bg-sky-500 text-white shadow-sm hover:bg-sky-400 active:bg-sky-600',
      },
      size: {
        "default": "h-9 px-4 py-2 has-[>svg]:px-3",
        "sm": "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        "lg": "h-10 rounded-md px-6 has-[>svg]:px-4",
        "icon": "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)
export type ButtonVariants = VariantProps<typeof buttonVariants>
