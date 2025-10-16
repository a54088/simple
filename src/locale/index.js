/*
 * @Author: 王硕
 * @Date: 2025-10-16 16:03:23
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-16 16:34:23
 * @Description:
 */
import { createI18n } from "@/uni_modules/uview-next";

import loginZhHans from "./modules/login/zh-Hans.json";
import loginEn from "./modules/login/en.json";

const locales = {
  "zh-Hans": {
    ...loginZhHans,
  },
  en: {
    ...loginEn,
  },
};
debugger;
const config = {
  locale: "zh-Hans", // 默认显示语言
  fallbackLocale: "en", // 回退语言
  messages: locales,
};
export const i18n = createI18n(config);
