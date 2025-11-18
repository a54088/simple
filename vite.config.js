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
    // 自定义插件：注入 UTSAndroid 全局对象占位符（仅开发模式，不处理 UTS 文件）
    {
      name: 'vite-plugin-inject-uts-android',
      enforce: 'pre',
      transform(code, id, options) {
        // 不处理 UTS 文件，UTS 文件会被编译到原生代码，UTSAndroid 会由 uni-app 自动提供
        if (id.endsWith('.uts')) {
          return null;
        }
        
        // 只在开发模式（非生产构建）时注入占位符
        // 生产构建时不应该注入占位符，UTSAndroid 应该由 uni-app 在编译时提供
        const isProduction = options?.ssr === false && process.env.NODE_ENV === 'production';
        if (isProduction) {
          return null;
        }
        
        // 只处理 .ts 和 .js 文件（用于开发模式）
        if (id.match(/\.(ts|js)$/) && code.includes('UTSAndroid') && !code.includes('declare const UTSAndroid') && !code.includes('UTSAndroid 开发模式占位符')) {
          // 在文件开头注入 UTSAndroid 的全局声明和占位符实现
          const isTypeScript = id.endsWith('.ts');
          const typeCast = isTypeScript ? '(globalThis as any)' : 'globalThis';
          const utsAndroidShim = `
// ===== UTSAndroid 开发模式占位符（自动注入，仅开发模式使用） =====
// 注意：UTSAndroid 仅在 Android 平台编译时可用，此代码仅用于开发模式
// 此占位符仅在非 UTS 文件中使用，UTS 文件会直接使用编译时提供的 UTSAndroid
// 在生产构建时，此占位符不会被注入
if (typeof globalThis !== 'undefined' && typeof ${typeCast}.UTSAndroid === 'undefined') {
  ${typeCast}.UTSAndroid = {
    getUniActivity: function() {
      console.warn('[开发模式] UTSAndroid.getUniActivity() 仅在 Android 平台可用');
      return null;
    },
    getAppContext: function() {
      console.warn('[开发模式] UTSAndroid.getAppContext() 仅在 Android 平台可用');
      return null;
    }
  };
}
// ===== 占位符结束 =====

`;
          return utsAndroidShim + code;
        }
        return null;
      },
    },
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
