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

// 自定义插件：处理 UTS Java 类导入
// 这些 Java 类导入应该由 UTS 编译器在运行时处理
// 插件让 Rollup 知道这些导入是有效的，但保留原始导入语句供 UTS 编译器使用
function utsJavaClassPlugin() {
  return {
    name: "uts-java-class-plugin",
    resolveId(id) {
      // 如果是 Java 类导入（以 com. 或 android. 开头），标记为外部依赖
      // 但不提供 globals，这样运行时由 UTS 编译器处理
      if (id.startsWith("com.") || id.startsWith("android.")) {
        return { id, external: true };
      }
      return null;
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    utsJavaClassPlugin(), // 处理 UTS Java 类导入
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
  },
  build: {
    terserOptions: {
      format: {
        comments: false, // 去除所有注释
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
