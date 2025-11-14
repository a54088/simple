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

  add(param,options = {}) {
    const {canUpdate = true,unshift = false} = options
    const paramIsArray = Array.isArray(param)
    let datas = paramIsArray ? param : [param]
    
    // console.time('add __beforeAdd' + this.constructor.name)
    let res = this.__beforeAdd(datas,options)
    // console.timeEnd('add __beforeAdd' + this.constructor.name)
    if(res !== undefined){
      datas = res
    }
    // 插入之前dataList是否为空
    const isEmpty = this.dataList.length === 0
    const resData = datas.map(item => {
      let val;
      if(this.indexKey){
        this.indexKey.split('.').forEach(k => {
          val = val ? val[k] : item[k]
        })
      }else{
        val = item._id || item.id || { [Object.keys(item)[0]]: item[Object.keys(item)[0]] }
      }
      // 如果当前数据列表为空或者没有传入索引值，则不检查要插入的数据是否存在
      let _data = (isEmpty || !val) ? false : this.find(val)
      // console.log('add _data',{_data,item})
      // 如果已经存在的，只更新不添加
      if(_data){
        if(canUpdate && item != _data){
          // console.log('添加的对象已经存在，更新对象',{item,item})
          try{
            utils.deepAssign(_data,item)
          }catch(e){
            console.error('合并更新出错',{item,_data,e})
          }
        }
        return _data
      }else{
        if(unshift){
          this.dataList.unshift(item)
          item = this.dataList.slice(0,1)[0]
        }else{
          this.dataList.push(item)
          item = this.dataList.slice(-1)[0]
        }
        if(this.indexKey){
          // console.time('dataMap set')
          let key;
          this.indexKey.split('.').forEach(k => {
            key = key ? key[k] : item[k]
          })
          const cs = this.__canSeaveToDataMap
          const val = cs ? cs(item) : true
          if(val){
            this.dataMap.set(key, item)
          }
          // console.log('this.dataMap',this.dataMap)
          // console.timeEnd('dataMap set')
        }
        return item
      }
    })
    this.__afterAdd(resData,options)
    // console.error('param',param)
    // console.timeEnd('add' + this.constructor.name)
    return paramIsArray ? resData : resData[0]
  }
}