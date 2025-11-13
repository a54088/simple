
import { client } from "@/shared/network/index";

const ImApi = {
  /**
   * 获取会话列表
   * @param {*} data
   * @returns
   */
  getConversationList: (data) => client.createGet("/im/app-conversation/list", data),

  /**
   * 创建会话
   * @param {*} data
   * @returns
   */
  createConversation: (data) => client.createPostJSON("/im/app-conversation/create", data),

};

export default ImApi;
