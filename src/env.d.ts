/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

// UTSAndroid 全局对象类型声明（uni-app Android 平台）
declare global {
  interface UTSAndroid {
    /**
     * 获取 uni-app Activity 上下文
     * @returns Android Context 对象
     */
    getUniActivity(): any;
    
    /**
     * 获取应用上下文
     * @returns Android Context 对象
     */
    getAppContext(): any;
  }
  
  // 在全局作用域声明 UTSAndroid
  const UTSAndroid: UTSAndroid;
}
