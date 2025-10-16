/*
 * @Author: 王硕
 * @Date: 2025-10-15 14:04:12
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-16 16:19:25
 * @Description:
 */
import { createSSRApp } from "vue";
import { createPinia } from "pinia";

import uViewNext from "@/uni_modules/uview-next";
import { i18n } from "@/locale";
debugger;
import App from "./App.vue";

export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  app.use(uViewNext);
  app.use(pinia);
  app.use(i18n);

  return {
    app,
  };
}
