/*
 * @Author: 王硕
 * @Date: 2025-07-26 13:42:56
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-28 13:58:00
 * @Description:
 */
import { client } from "@/shared/network/index";

const UserApi = {

  /** 获取会员认证信息 */
  getMemberAuthInfo: () => client.createGet("/member/real-name-info/get"),

  /** 创建会员认证 */
  createMemberAuth: (parameter) =>
    client.createPostJSON("/member/real-name-info/create", parameter),
  /** 更新会员认证 */
  updateMemberAuth: (parameter) =>
    client.createPutJSON("/member/real-name-info/update", parameter),
  /** 修改基本信息 */
  userUpdate: (parameter) =>
    client.createPutJSON("/member/user/update", parameter),
  // 重置密码
  resetUserPassword: (data) =>
    client.createPutJSON("/member/user/reset-password", data),
};

export default UserApi;
