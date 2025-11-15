export default class MsgItem  {
  constructor(msgData) {
    for (let key in msgData) {
      this[key] = msgData[key]
    }
  }
}