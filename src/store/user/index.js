/*
 * @Author: 王硕
 * @Date: 2025-05-20 12:55:22
 * @LastEditors: 王硕
 * @LastEditTime: 2025-09-19 18:51:50
 * @Description:
 */
import { defineStore } from "pinia";
import {
  accessToken,
  userInfo,
  refreshToken,
  userId,
  clear,
} from "@/shared/utils/storage.js";
import userApi from "@/api/user/index";
import memberApi from "@/api/member/index";

export const useUserStore = defineStore("UserStore", {
  state: () => {
    return {
      token: accessToken.get(),
      userId: userId.get(),
      refreshToken: refreshToken.get(),
      userInfo: userInfo.get(),
    };
  },

  getters: {
    isLogin(state) {
      return !!state.token;
    },
  },

  actions: {
    logout() {
      this.token = "";
      this.refreshToken = "";
      this.userInfo = {};
      clear();
    },
    setUserId(val) {
      userId.set(val);
      this.userId = val;
    },
    setUserInfo(val) {
      this.userInfo = val;
      userInfo.set(val);
    },
    async getUserInfo() {
      const { data, code } = await memberApi.getUserInfo();
      if (code === 0) {
        this.setUserInfo(data);
      }
    },
    setToken(val) {
      this.token = val;
      accessToken.set(val);
      // this.getUserInfo();
    },
    setRefreshToken(val) {
      this.refreshToken = val;
      refreshToken.set(val);
    },
  },
});
