/*
 * @Author: 王硕
 * @Date: 2025-10-15 14:04:12
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-27 13:30:58
 * @Description:
 */
import { createSSRApp } from "vue";
import { createPinia } from "pinia";

import uViewNext from "@/uni_modules/uview-next";
import { i18n } from "@/locale";

import 'animate.css';
import devTools from "./devTools/index.js";
import devToolsConfig from "./devTools/config.js";
import mpDevBubble from "./devTools/core/components/mpDevBubble.vue";
import devToolsVueMixin from "./devTools/core/proxy/vueMixin.js";

import App from "./App.vue";

export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  app.use(uViewNext);

  //混入DevTools生命周期监听
  app.mixin(devToolsVueMixin);
  //挂载Devtools
  app.use(devTools, devToolsConfig);
  //注册小程序端专用的拖动浮标组件
  app.component("mpDevBubble", mpDevBubble);

  app.use(pinia);
  app.use(i18n);

  return {
    app,
  };
}
