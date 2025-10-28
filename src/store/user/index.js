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

export const useUserStore = defineStore("UserStore", {
  state: () => {
    return {
      token: accessToken.get(),
      userId: userId.get(),
      refreshToken: refreshToken.get(),
      userInfo: userInfo.get(),
      userMemberInfo: {}, // 会员信息
    };
  },

  getters: {
    /**
     * 是否签署用户协议
     * @param {*} state
     * @returns
     */
    isSignedUserAgreement(state) {
      return state.userInfo.signedUserAgreement === 2;
    },
    /**
     * 会员奖励续期时间
     * @param {*} state
     * @returns
     */
    nextRecommendTime(state) {
      return state.userInfo.nextRecommendTime;
    },
    isLogin(state) {
      return !!state.token;
    },
    level(state) {
      return state.userInfo.level;
    },
    /**
     * 获取用户签署用户协议的状态
     * @param {*} state
     * @property {number} 0 - 未提交
     * @property {number} 1 - 认证中
     * @property {number} 2 - 认证成功
     * @property {number} 3 - 认证失败
     * @returns {UserAuctionAgreementEnum}
     */
    signedUserAgreement(state) {
      return state.userInfo.signedUserAgreement;
    },
    /**
     * 是否实名认证通过
     * @param {*} state
     * @returns
     */
    isRealName(state) {
      return state.userInfo.isRealName;
    },
    // 账户是否已终止
    isAccountTerminated(state) {
      return state.userInfo.score <= 0;
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
      const { data, code } = await userApi.getUserInfo();
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
    async getUserMemberInfo() {
      try {
        const { code, data } = await userApi.getMemberAuthInfo();
        if (code != 0) return;

        this.userMemberInfo = data || {};
      } catch (e) {
        console.log(e);
      }
    },
  },
});
