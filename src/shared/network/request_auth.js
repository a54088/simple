/*
 * @Author: 王硕
 * @Date: 2025-06-27 14:49:55
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-15 16:41:56
 * @Description:
 */
import { tenantId } from "@/config/index";
import { useUserStore } from "@/store/index";
const onFulfilled = (config) => {
  let requestSource = "h5";
  // #ifdef APP-PLUS
  requestSource = "app";
  // #endif
  // #ifdef H5
  requestSource = "h5";
  // #endif

  config.header = {
    "Tenant-Id": tenantId,
    "X-Request-Source": requestSource,
    // #ifdef APP-PLUS
    Referer: "cos.shanghejingan.com",
    // #endif
  };
  const token = useUserStore().token;
  if (token) {
    Object.assign(config.header, {
      Authorization: `${token}`,
    });
  }
  return config;
};

export default { onFulfilled };
