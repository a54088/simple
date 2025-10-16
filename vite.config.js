/*
 * @Author: 王硕
 * @Date: 2025-10-15 14:04:13
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-16 13:54:08
 * @Description:
 */
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import AutoImport from "unplugin-auto-import/vite";
import { resolve } from "path";
import { createHtmlPlugin } from "vite-plugin-html";
// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
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
