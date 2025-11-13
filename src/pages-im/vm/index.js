import { ViewModel } from "@/shared/class/view-model.js";
import onSocketStateChange from './init/onSocketStateChange'
import onAppActivateStateChange from './init/onAppActivateStateChange'
import Apis from '@/api/index.js'
import { Conversation } from './class/Conversation.js'
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
      key: 'tjhy'
    },
    {
      icon: 'icon-saoyisao-2',
      text: '扫一扫',
      key: 'sys'
    },
  ]

  conversation = new Conversation()

  socketTask = null

  socketConnectState = null

  appActivateState = null

  systemInfo = uni.getSystemInfoSync()

  // 全局响应式心跳，用于更新消息距离当前时长 等
  heartbeat = ''

  constructor() {
    super()
  }

  init() {
    this.socketTask = uni.connectSocket({
      url: `${import.meta.env.VITE_APP_WS_API_PATH}/im/ws?token=b83056564d1a41099a1e74599ca73f4d&tenant_id=0`, //仅为示例，并非真实接口地址。
      success: (e) => {
        console.log('ws 链接成功等待消息发送。。。', e)
      },
      fail: (e) => {
        console.log('ws 链接失败', e)
      },
    });
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

  async getConversationList() {
    const { data } = await Apis.imApi.getConversationList({
      "pageNum": 1,
      "pageSize": 10,
    })
  }

  sendMessage(message) {
    if (this.socketTask) {
      const data = {
        "type": "send_message",
        "content": '',
      }
      data.content = JSON.stringify({
        "conversationId": 1,
        "clientMsgId": "cli_20241026153500_u1002",
        "messageType": 2,
        "content": message,
        "contentType": "image/jpeg",
        "fileUrl": "https://storage.example.com/images/act_20241026.jpg",
        "fileName": "活动现场.jpg",
        "fileSize": 204800,
        "fileDuration": null,
        "thumbnailUrl": "https://storage.example.com/thumbnails/act_20241026_100x100.jpg",
        "replyMessageId": null
      })
      console.log('ws 消息发送', data)
      this.socketTask.send({
        data,
        success: (e) => {
          console.log('ws 消息发送成功', e)
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