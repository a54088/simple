/*
 * @Author: 王硕
 * @Date: 2025-07-26 13:42:56
 * @LastEditors: 王硕
 * @LastEditTime: 2025-08-16 15:48:10
 * @Description:
 */
import { client } from "@/shared/network/index";

const AuthApi = {
  /**
   * 登录
   * @param {*} data
   * @returns
   */
  login: (data) => client.createPostJSON("/member/auth/login", data),

  /**
   * 使用手机 + 验证码登录
   * @param {*} data
   * @returns
   */
  smsLogin: (data) => client.createPostJSON("/member/auth/sms-login", data),

  /**
   * 发送短信验证码
   * @param {*} data
   * @returns
   */
  sendSmsCode: (data) =>
    client.createPostJSON("/member/auth/send-sms-code", data),

  /**
   * 注册
   * @param {*} data
   * @returns
   */
  register: (data) => client.createPostJSON("/member/auth/register", data),

  /**
   * 刷新令牌
   * @param {*} data
   * @returns
   */
  refreshToken: (data) =>
    client.createPostJSON(
      `/member/auth/refresh-token?refreshToken=${data.refreshToken}`
    ),
};

export default AuthApi;
