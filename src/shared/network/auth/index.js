/*
 * @Author: 王硕
 * @Date: 2025-05-08 11:11:16
 * @LastEditors: 王硕
 * @LastEditTime: 2025-05-12 16:31:28
 * @Description:
 */
import { debounce } from "lodash-es";
import { accessToken, clear, refreshToken } from "@/shared/utils/storage";
import authPrison from "./auth_prison";
import BasicClient from "../client/index";

let linkLock = false;

const goLogin = () => {
  // #ifdef MP
  let loginPage = "/pages/index/index";
  // #ifdef H5
  loginPage = "/pages/index/index";
  // endif
  clear();
  const routes = getCurrentPages(); // 获取当前打开过的页面路由数组
  const curRoute = routes.length > 0 ? routes[routes.length - 1].route : "";
  if (curRoute && curRoute.includes(loginPage)) {
    console.warn("留住");
  } else {
    // 防止 同时执行多个接口因token失效失败时 多次返回登录
    if (!linkLock) {
      linkLock = true;
      uni.navigateTo({ url: loginPage });
      setTimeout(() => {
        linkLock = false;
      }, 0);
    }
  }
};

const baseURL = import.meta.env.VITE_APP_API_ROOT;

const wildClient = new BasicClient({ baseURL, isRaw: false });

const refreshAccessToken = (
  params = {
    grant_type: "refresh_token",
    scope: "all",
    client_id: "client-app",
    client_secret: "123456",
    alipaySMS: true,
    alipayRefresh: true,
    refresh_token: refreshToken.get(),
    productId: import.meta.env.VITE_PRODUCT_ID,
  }
) => {
  return wildClient.createPostJSON("/user-auth/account/login", params, {
    header: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  });
};

const refreshAuth = debounce(
  async () => {
    try {
      const refreshRes = await refreshAccessToken();

      const refreshResData = refreshRes.data;

      if (
        refreshResData &&
        refreshResData.token &&
        refreshResData.refreshToken
      ) {
        // 设置新的tokens
        accessToken.set(refreshResData.token);
        refreshToken.set(refreshResData.refreshToken);
        authPrison.brokeBy(refreshResData);
        return refreshRes;
      }
      // 接口请求成功，但是tokens返回异常
      authPrison.closePrison();
      console.warn("没返回token goLogin");
      // goLogin();
      return Promise.reject(new Error("登录失效"));
    } catch (e) {
      // refresh atk失败，直接跳转登录
      authPrison.closePrison();
      console.warn("接口报错没返回token goLogin");
      // goLogin();
      return Promise.reject(new Error("登录失效"));
    }
  },
  200,
  true
);

export { refreshAuth, goLogin };
