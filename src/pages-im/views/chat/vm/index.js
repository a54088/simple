import { ViewModel } from "@/shared/class/view-model.js";

export class ChatVM extends ViewModel {

  list = [
    {
      /** 会话id */
      conversationId: '',
      /** 消息id */
      clientMsgId: '',
      /** 消息类型
       * 1-文本 2-图片 3-语音 4-视频 5-文件 6-系统消息
       */
      messageType: '',
      /** 消息内容 */
      content: '',
      /** 消息内容类型
       * text-文本 image-图片 audio-语音 video-视频 file-文
       */
      contentType: '',
      /** 文件url */
      fileUrl: '',
      /** 文件名 */
      fileName: '',
      /** 文件大小 */
      fileSize: '',
      /** 文件时长 */
      fileDuration: '',
      /** 视频/图片/文件的缩略图url */
      thumbnailUrl: '',
      /** 回复的消息id */
      replyMessageId: '',
    }
  ]

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

  constructor() {
    super()
  }
}