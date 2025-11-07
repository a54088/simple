/*
 * @Author: 王硕
 * @Date: 2025-07-26 13:42:56
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-28 13:58:00
 * @Description:
 */
import { client } from "@/shared/network/index";

const UserApi = {
  /** 使用邀请码 */
  useInviteCode: (parameter) => client.createGet("/member/userInviteCode/useInviteCode", parameter),

  /** 使用手机-邮箱 + 验证码注册 + 登录 */
  registerLogin: (parameter) =>
    client.createPostJSON("/member/auth/registerLogin", parameter),
  /** 使用手机 + 密码登录 */
  authLogin: (parameter) =>
    client.createPostJSON("/member/auth/login", parameter),
  /** 获取用户信息 */
  getUserInfo: (parameter) => client.createGet("/member/user/get", parameter),

  /** 发送邮箱验证码 */
  sendEmailLoginCode: (parameter) =>
    client.createPostJSON("/member/auth/send-email-code", parameter),
};

export default UserApi;
