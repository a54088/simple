import CloudData from "../ext/CloudData.class"
import ConversationItem from "./ConversationItem.js"



export class Conversation extends CloudData {
  constructor() {
    super()
    this.inheritedBy = 'conversation'
    this.indexKey = 'id'
    // 云端{"未读会话id":未读数}数据
    this.cloudUnreadCountObj = {}
    // 定义加载数据的条数
    this.loadLimit = 15
  
  }

 
  __beforeAdd(datas){
		 // console.log('__beforeAdd',datas)
    if(!Array.isArray(datas)){
      datas = [datas]
    }
    return datas
  }
  __afterAdd(datas){
    if(!Array.isArray(datas)){
      datas = [datas]
    }
    
    datas.forEach(conversation => {
      const {msgList} = conversation
      if(msgList){
        // 服务端查找“应当”按消息“更新”时间排序，但显示需要按“创建”时间倒序，所以这里需要重新排序
        msgList.sort((a,b) => a.create_time - b.create_time)
        // 将会话数据带的msgList添加到msg中
        conversation.msg.add(msgList,{canSetIsFull:true})
        // 删除冗余数据
        delete conversation.msgList
      }
    })
    
    
    // 通过 setTimeout 0，使得在下一次事件循环中执行，避免冲突
    setTimeout(() => {
      // console.log('__afterAdd',datas)
      datas.forEach(conversation => {
        // init响应式字段
        const activeProperty = this.find(conversation.id).activeProperty()
        Object.keys(activeProperty).forEach(key => {
          const item = activeProperty[key]
          conversation[key] = computed(item)
        })
      })
    }, 0)
  }
  __afterGet(datas){
    // 获取单个会话时，检查群会话是否已经加载完群成员
    if(datas && !Array.isArray(datas)){
      const conversation = datas
      const member = conversation.group?.member
      if (member?.needLoadOnce) {
        member.needLoadOnce = false
        setTimeout(()=>member.loadMore(),1000)
      }
    }
  }
  __afterGetMore(datas){
    if (this.dataList.length === 0 && datas.length >0){
      // console.log('首次拉取会话')
     // getCloudMsg()
    }
  }
  async __get(param) {
    const loadMoreType = this.loadMore?.type || 'all'
		const lastConversationKey = typeof loadMoreType === 'string' ? loadMoreType : Object.keys(loadMoreType).join('-') + "_" + Object.values(loadMoreType).join('-')
    let conversation_id = param
    if (typeof param === "object"){
      conversation_id = param.id || param.conversation_id
    }
    const uniImCo = uniCloud.importObject("uni-im-co",{customUI: true})
    const limit = this.loadLimit
    const conversationDatas = this.dataList
    // 已有会话id的情况下，不设置更新时间条件
    let maxLastMsgCreateTime = false;
    let skip = 0;
    const group_id = param?.group_id
    if (!conversation_id && !group_id) {
      // 会话列表的总数
      const conversationCount = conversationDatas.length
      if(conversationCount !== 0){
        // 本地除置顶会话之外的普通会话个数
        const normalConversationCount = conversationDatas.filter(i => !i.pinned).length
        if(normalConversationCount === 0){
          // 全部是置顶会话的情况下，当前会话有几个就跳过几个
          skip = conversationCount
        }else{
          // 上一次请求的最后一条会话数据，用于分页查询。如果当前会话列表为空（比如：首次打开/被移除了所有会话/重新登录等），则此字段应当为false
          maxLastMsgCreateTime = this.loadMore?.lastConversation?.[lastConversationKey]?.last_msg_create_time || false
          // console.log('maxLastMsgCreateTime：'+maxLastMsgCreateTime,'loadMoreType:'+lastConversationKey);
          if(maxLastMsgCreateTime){
            // 查询时间与 maxLastMsgCreateTime 相同的会话数。（因为某些情况下，多个会话的update_time相同）
            skip = conversationDatas.filter(i => i.last_msg_create_time === maxLastMsgCreateTime).length
          }
        }
      }
    }
    // console.log('maxLastMsgCreateTime', maxLastMsgCreateTime);
    let res = await uniImCo.getConversationList({
      maxLastMsgCreateTime,
      limit,
      conversation_id,
      skip,
      // 是否要区分是否为置顶会话
      distinguishPinned: loadMoreType === 'all',
      type:loadMoreType,
      group_id
    })
    if (!conversation_id) {
			if (typeof this.loadMore.lastConversation == "object") {
				this.loadMore.lastConversation[lastConversationKey] = res.data[res.data.length - 1]
			}else{
				this.loadMore.lastConversation = {[lastConversationKey]: res.data[res.data.length - 1]}
			}
    }
    return res.data
  }
  // 统计所有消息的未读数
  unreadCount() {
    // console.log('计算 conversation unreadCount')
    
  }
  /**
   * 清空所有未读消息数
   */
  clearUnreadCount(){
    
  }
  // 删除会话后，如果当前选中的会话是该会话，则清空当前选中的会话
  __afterRemove(item){
   
  }
}