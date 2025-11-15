import { ViewModel } from "@/shared/class/view-model.js";
import onSocketStateChange from './init/onSocketStateChange'
import onAppActivateStateChange from './init/onAppActivateStateChange'
import Apis from '@/api/index.js'
import { Conversation } from './class/Conversation.js'
import { useUserStore } from '@/store/index.js'
import MsgItem from './class/MsgItem.js'
export class IMVM extends ViewModel {
  showChatOperate = false

  chatOperateList = [
    {
      icon: 'icon-qunliao',
      text: '创建群聊',
      key: 'cjql'
    },
    {
      icon: 'icon-quanzi',
      text: '创建圈子',
      key: 'cjqz'
    },
    {
      icon: 'icon-tianjiahaoyou-',
      text: '添加好友',
      path: '/pages-im/views/add-friend/index',
      key: 'tjhy'
    },
    {
      icon: 'icon-saoyisao-2',
      text: '扫一扫',
      key: 'sys'
    },
  ]



  conversation = new Conversation()

  currentConversationId = ''

  socketTask = null

  socketConnectState = null

  appActivateState = null

  systemInfo = uni.getSystemInfoSync()

  // 全局响应式心跳，用于更新消息距离当前时长 等
  heartbeat = ''

  constructor() {
    super()
  }

  get userId() {
    return useUserStore().userId
  }

  get currentConversation() {
    return this.conversation.get({
      id: this.currentConversationId
    })
  }

  get currentConversationMsg() {
    return this.currentConversation.dataList
  }

  init() {
    this.socketTask = uni.connectSocket({
      url: `${import.meta.env.VITE_APP_WS_API_PATH}/im/ws?token=${useUserStore().token}&tenant_id=0`, //仅为示例，并非真实接口地址。
      success: (e) => {
        console.log('ws 链接成功等待消息发送。。。', e)
      },
      fail: (e) => {
        console.log('ws 链接失败', e)
      },
    });
    this.socketTask.onOpen((res) => {

      console.log('ws onOpen', res)
    })
    this.socketTask.onError((res) => {
      console.log('ws onError', res)
    })
    this.socketTask.onClose((res) => {
      console.log('ws onClose', res)
    })
    this.socketTask.onMessage((res) => {
      console.log('ws onMessage', res)
    })

    onSocketStateChange((state, count) => {
      this.socketConnectState = state;
      if (count > 1) {
        // TODO 大于1，说明是断开后重连；获取socket断开时丢失的数据
      }
    });
    // 监听应用处于“活动状态”，并记录状态和变成活动状态的次数。
    onAppActivateStateChange((state, count) => {
      this.appActivateState = state;
      if (!state) return;
      // #ifdef APP
      this.socketConnectState = state;
      // #endif
    });

    //时间戳心跳（定时器）用于刷新：消息或会话与当前的时间差。ps：全局共享一个定时器变量。比启多个定时器性能更好
    setInterval(() => {
      this.heartbeat = Date.now();
    }, 1000)
  }

  initData() {
    this.getConversationList()
  }

  setCurrentConversation(conversation_id) {
    this.currentConversationId = conversation_id
  }

  async getConversationList() {
    try {
      const { data, code } = await Apis.imApi.getConversationList()

      if (code === 0) {
        this.conversation.add(data.list)
      }
    } catch (e) {
      console.log('获取好友列表失败', e)
    }
  }



  async createConversation() {
    try {
      const parameter = {
        "conversationType": 1,
        "conversationName": "新群聊",
        "conversationAvatar": "",
        "memberIds": [
          this.userId,
          '3566'
        ]
      }
      const { data, code } = await Apis.imApi.createConversation(parameter)

      if (code === 0) {
        // this.conversation.add({
        //   ...parameter,
        //   id:data
        // })
        this.getConversationDetail(data)
      }
    } catch (e) {
      console.log('创建会话失败', e)
    }
  }

  async getConversationDetail(id) {
    try {
      const { data, code } = await Apis.imApi.getConversationDetail({
        "id": id,
      })
      if (code === 0) {
        this.conversation.add(data)
      }
    } catch (e) {
      console.log('获取会话详情失败', e)
    }
  }

  sendMessage(message) {
    if (this.socketTask) {
      const data = {
        "type": "send_message",
        "content": '',
      }
      const msg = new MsgItem({
        "conversationId": this.currentConversationId,
        "clientMsgId": Date.now(),
        "messageType": 2,
        "content": message,
        "contentType": "text",
        "fileUrl": "",
        "fileName": "",
        "fileSize": '',
        "fileDuration": null,
        "thumbnailUrl": "",
        "replyMessageId": null
      })
      data.content = JSON.stringify(msg)


      const tempData = JSON.stringify(data)
      console.log('ws 消息发送', tempData)
      const that = this
      this.socketTask.send({
        data: tempData,
        success: (e) => {
          try {
            const conversation = this.conversation.get({
              id: this.currentConversationId
            })
            conversation.msg.add(msg, { unshift: true })
            console.log('ws 消息发送成功', conversation)
          } catch (e) {
            console.log('ws 消息发送失败', e)
          }
        },
        fail: (e) => {
          console.log('ws 消息发送失败', e)
        },

      })
    }
  }

  closeSocket() {
    if (this.socketTask) {
      this.socketTask.close({
        success: (e) => {
          console.log('ws 关闭成功', e)
        },
        fail: (e) => {
          console.log('ws 关闭失败', e)
        },
      })
    }
  }
}