/*
 * @Author: 王硕
 * @Date: 2025-09-01 13:11:14
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-28 14:00:13
 * @Description:
 */
// 开发环境配置
export let baseUrl;

const env = import.meta.env.VITE_APP_ENV;

if (process.env.NODE_ENV === "development") {
  baseUrl = import.meta.env.VITE_APP_DEV_BASE_URL;
} else {
  baseUrl = import.meta.env.VITE_APP_BASE_URL;
}

if (env === "test") {
  baseUrl = import.meta.env.VITE_APP_TEST_BASE_URL;
}

if (env === "prod") {
  baseUrl = import.meta.env.VITE_APP_BASE_URL;
}
if (typeof baseUrl === "undefined") {
  console.error("请检查.env配置文件是否存在");
}

export const apiPath = import.meta.env.VITE_APP_API_PATH;
export const staticUrl = import.meta.env.SHOPRO_STATIC_URL;
export const tenantId = import.meta.env.VITE_APP_TENANT_ID;
export const websocketPath = import.meta.env.SHOPRO_WEBSOCKET_PATH;
export const h5Url = import.meta.env.SHOPRO_H5_URL;
export const H5Url = import.meta.env.VITE_H5_URL;

export default {
  baseUrl,
  apiPath,
  staticUrl,
  tenantId,
  websocketPath,
  h5Url,
  H5Url,
};
