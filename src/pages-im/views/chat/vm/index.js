import { ViewModel } from "@/shared/class/view-model.js";

export class ChatVM extends ViewModel {
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