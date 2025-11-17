
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

  /**
   * 获取好友列表
   * @param {*} data
   * @returns
   */
  getFriendList: () => client.createGet("/im/user-friend/list"),


  /**
   * 处理好友申请
   * @param {*} data
   * @returns
   */
  dealAddFriend: (data) => client.createPutJSON("/im/friend-request/handle", data),

  /**
   * 获取好友申请列表
   * @param {*} data
   * @returns
   */
  getApplyFriendList: () => client.createGet("/im/app-friend/request/list"),

  /**
   * 搜索好友
   * @param {*} data
   * @returns
   */
  searchFriend: (data) => client.createGet("/im/app-friend/search", data),

  /**
   * 拉黑好友
   * @param {*} data
   * @returns
   */
  blockFriend: (data) => client.createPostJSON("/im/user-friend/black", data),

  /**
   * 获取拉黑好友列表
   * @param {*} data
   * @returns
   */
  getBlockFriendList: () => client.createGet("/im/user-blacklist/list"),

  /**
   * 获取好友数量
   * @param {*} data
   * @returns
   */
  getFriendCount: () => client.createGet("/im/user-friend/count"),

  /**
   * 删除好友
   * @param {*} data
   * @returns
   */
  deleteFriend: (data) => client.createDelete("/im/user-friend/delete-friend", data),

  /**
   * 更新好友分组
   * @param {*} data
   * @returns
   */
  updateFriendGroup: (data) => client.createPutJSON("/im/friend-group/update", data),

  /**
   * 更新好友备注
   * @param {*} data
   * @returns
   */
  updateFriendRemark: (data) => client.createPutJSON("/im/user-friend/update-remark", data),

  /**
   * 清空会话
   * @param {*} data
   * @returns
   */
  clearConversation: (data) => client.createPostJSON("/im/app-conversation/clear-messages", data),

  /**
   * 删除会话
   * @param {*} data
   * @returns
   */
  deleteConversation: (data) => client.createDelete("/im/conversation/delete", data),

  /**
   * 获取会话详情
   * @param {*} data
   * @returns
   */
  getConversationDetail: (data) => client.createGet("/im/app-conversation/get", data),

  /**
   * 获取好友列表
   * @param {*} data
   * @returns
   */
  getAppFriendList: () => client.createGet("/im/app-friend/list"),
  /**
   * 申请添加好友
   * @param {*} data
   * @returns
   */
  applyAddFriend: (data) => client.createPostJSON("/im/app-friend/request/send", data),
};

export default ImApi;
