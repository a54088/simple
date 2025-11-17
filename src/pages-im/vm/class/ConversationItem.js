import Msg from './Msg.js'
/**
 * 会话类，实现会话相关的业务逻辑。
 */
export default class ConversationItem  {
  constructor(data) {
    this.chatInputContent = ''
    // 客户端创建此会话的时间
    this.client_create_time = Date.now()
    // 是否已离开（退出、被踢出）群聊
    this.leave = false
    // 默认不置顶
    this.pinned = false
    
    this.tags = []

     // 是否已经初始化。 从缓存中取出的会话数据可能已经初始化，这里需要归零
    data.isInit = true
    Object.assign(this, data)

    this.msg = new Msg(data.id)
  }
}