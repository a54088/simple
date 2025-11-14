import CloudData from "../ext/CloudData.class"

/**
 * 消息类，实现消息相关的业务逻辑。
 */
export default class Msg extends CloudData {
  constructor(conversation_id) {
    super()
    this.loadLimit = 10 //每次拉取的条数
    this.conversation_id = conversation_id
    this.isFull = false
  }
}