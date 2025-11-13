/*
 * @Author: 王硕
 * @Date: 2025-10-15 14:04:13
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-27 16:31:56
 * @Description:
 */
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import UniKuRoot from "@uni-ku/root";

import AutoImport from "unplugin-auto-import/vite";
import { resolve } from "path";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    // 自定义插件：必须在 uni() 插件之前，以拦截 Android 系统库导入
    {
      name: 'vite-plugin-ignore-uts-imports',
      enforce: 'pre', // 确保在其他插件之前执行
      resolveId(id) {
        // 如果是 Android 系统库或 Java/Kotlin 类导入，返回虚拟模块
        // 这些导入在开发模式下不需要解析，会在编译到 Android 时由 UTS 编译器处理
        if (id.startsWith('android.') || (id.startsWith('com.') && !id.startsWith('./') && !id.startsWith('../'))) {
          return '\0virtual:' + id; // 使用虚拟模块前缀
        }
        return null;
      },
      load(id) {
        // 为虚拟模块返回一个简单的对象，避免 Vite 报错
        // 实际的导入和实现会在 UTS 编译时被正确处理
        if (id.startsWith('\0virtual:android.') || id.startsWith('\0virtual:com.')) {
          const moduleId = id.replace('\0virtual:', '');
          return `
// 虚拟模块占位符：${moduleId}
// 此模块仅在开发模式下使用，实际编译到 Android 时会由 UTS 编译器处理
// 开发模式下返回空对象以避免 Vite 解析错误
export default {};
`;
        }
        return null;
      },
    },
    createHtmlPlugin({
      minify: true,
      transform(html) {
        return html.replace(/<!--[\s\S]*?-->/g, "");
      },
    }),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
      imports: ["vue"],
    }),
    UniKuRoot(),
    uni(),
  ],
  resolve: {
    alias: {
      "@": resolve("./src"),
    },
    // 为 Android 系统库和 Java/Kotlin 类提供虚拟模块，避免 Vite 解析错误
    // 这些导入在编译到 Android 时会被 UTS 编译器正确处理
    dedupe: ['vue'],
  },
  optimizeDeps: {
    // 排除可能导致问题的模块
    exclude: [],
  },
  build: {
    terserOptions: {
      format: {
        comments: false, // 去除所有注释
      },
    },
    rollupOptions: {
      external: (id) => {
        // 排除 Android 系统库导入，这些应该由 UTS 编译器处理
        if (id.startsWith('android.')) {
          return true
        }
        // 排除 Java/Kotlin 类导入（但不排除相对路径导入，如 ./com/xxx）
        if (id.startsWith('com.') && !id.startsWith('./') && !id.startsWith('../')) {
          return true
        }
        return false
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["legacy-js-api", "import"],
        quietDeps: true, // 忽略依赖中的警告
        // 将 @import 替换为 @use
        // additionalData: `@use "@/styles/mixins.scss" as *;`,
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
