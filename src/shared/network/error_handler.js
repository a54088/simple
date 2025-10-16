/*
 * @Author: 王硕
 * @Date: 2025-06-27 16:45:33
 * @LastEditors: 王硕
 * @LastEditTime: 2025-09-15 13:25:06
 * @Description:
 */
import { useUserStore } from "@/store/index";
import authApi from "@/api/auth/index";

const muteReqPaths = [];

/**
 * 处理 401 未登录的错误
 */
const handleAuthorized = () => {
  useUserStore().logout();
  // 登录超时
  return Promise.reject({
    code: 401,
    msg: useUserStore().token ? "您的登录已过期" : "请先登录",
  });
};

// Axios 无感知刷新令牌，参考 https://www.dashingdog.cn/article/11 与 https://segmentfault.com/a/1190000020210980 实现
let requestList = []; // 请求队列
let isRefreshToken = false; // 是否正在刷新中
const refreshToken = async (config) => {
  // 如果当前已经是 refresh-token 的 URL 地址，并且还是 401 错误，说明是刷新令牌失败了，直接返回 Promise.reject(error)
  if (config.url.indexOf("/member/auth/refresh-token") >= 0) {
    return Promise.reject("error");
  }
  // 如果未认证，并且未进行刷新令牌，说明可能是访问令牌过期了
  if (!isRefreshToken) {
    isRefreshToken = true;
    // 1. 如果获取不到刷新令牌，则只能执行登出操作
    const refreshToken = useUserStore().refreshToken;
    if (!refreshToken) {
      return handleAuthorized();
    }
    // 2. 进行刷新访问令牌
    try {
      const parameter = {
        refreshToken,
      };
      const refreshTokenResult = await authApi.refreshToken(parameter);
      if (refreshTokenResult.code !== 0) {
        // 如果刷新不成功，直接抛出 e 触发 2.2 的逻辑
        // noinspection ExceptionCaughtLocallyJS
        throw new Error("刷新令牌失败");
      }
      // 刷新成功，更新访问令牌
      useUserStore().setToken(refreshTokenResult.data.accessToken);
      useUserStore().setRefreshToken(refreshTokenResult.data.refreshToken);
      // 2.1 刷新成功，则回放队列的请求 + 当前请求
      config.header.Authorization = "Bearer " + useUserStore().token;
      requestList.forEach((cb) => {
        cb();
      });
      requestList = [];
      return request(config);
    } catch (e) {
      // 为什么需要 catch 异常呢？刷新失败时，请求因为 Promise.reject 触发异常。
      // 2.2 刷新失败，只回放队列的请求
      requestList.forEach((cb) => {
        cb();
      });
      // 提示是否要登出。即不回放当前请求！不然会形成递归
      return handleAuthorized();
    } finally {
      requestList = [];
      isRefreshToken = false;
    }
  } else {
    // 添加到队列，等待刷新获取到新的令牌
    return new Promise((resolve) => {
      requestList.push(() => {
        config.header.Authorization = useUserStore().token; // 让每个请求携带自定义token 请根据实际情况自行修改
        resolve(request(config));
      });
    });
  }
};
const onFulfilled = (response) => {
  const { config, data } = response;
  const isMute = muteReqPaths.includes(config.url || "");

  const { code, error_code, error_description, msg } = response.data;
  if (isMute) {
  } else if (code === 401) {
    return refreshToken(response.config);
  } else if (code === 450) {
    uni.redirectTo({
      url: "/pages-sub/login/index",
    });
  } else if (code !== 0) {
    uni.showToast({ title: msg || "服务器开小差中~", icon: "none" });
  }
  return response;
};

const onRejected = (response) => {
  return response;
};

export default { onFulfilled, onRejected };
