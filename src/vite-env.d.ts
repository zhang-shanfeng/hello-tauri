/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

import { rippleDirective } from './ripple'; // 指令路径视你项目而定

declare module '@vue/runtime-core' {
  export interface ComponentCustomDirectives {
    // 声明 v-ripple 指令存在
    vRipple: typeof rippleDirective;
  }
}