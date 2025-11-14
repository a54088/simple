import appEvent from './appEvent';
import toFriendlyTime from './toFriendlyTime';
import shortcutKey from './shortcut-key.js';
import parseHtml from './html-parser.js';
import markdownIt from './markdown-it.min.js';
import md5 from './md5.min.js'

export default {
  appEvent,
  toFriendlyTime,
  shortcutKey,
  parseHtml,
  markdownIt,
  /**
   *深度合并多个对象的方法
   */
  deepAssign() {
    let len = arguments.length,
      target = arguments[0]
    if (!this.isPlainObject(target)) {
      target = {}
    }
    for (let i = 1; i < len; i++) {
      let source = arguments[i]
      if (this.isPlainObject(source)) {
        for (let s in source) {
          if (s === '__proto__' || target === source[s]) {
            continue
          }
          if (this.isPlainObject(source[s])) {
            target[s] = this.deepAssign(target[s], source[s])
          } else {
            target[s] = source[s]
          }
        }
      }
    }
    return target
  },
  /**
   * 替换文本中的url为套了html的a标签的方式
   */
  replaceUrlToLink(str) {
    // 找网址
    let urlPattern = /(https?:\/\/|www\.)[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
    return str.replace(urlPattern, function(match) {
      var href = match;
      if (match.indexOf("http") == -1) {
        //如果不带http://开头就带上
        href = "http://" + match;
      }
      return `<a class="link" target="_blank" href="${href}">${match}</a> `;
    });
  },
  /**
   *判断对象是否是一个纯粹的对象
   */
  isPlainObject(obj) {
    return typeof obj === 'object' && Object.prototype.toString.call(obj) === '[object Object]'
  },
 
  isMuteMsg(msg){
    return (
      // TODO：静默消息
      msg.is_mute === true
      ||
      // 加群消息
      msg.action === "join-group" 
      || 
      // 禁言通知
      msg.action === 'update-group-info-mute_all_members' 
    )
  },
 
  // 节流执行函数，用于控制频繁触发的事件。
  throttle(fn, delay) {
    fn.timer && clearTimeout(fn.timer);
    fn.timer = setTimeout(fn, delay);
  },
  async sleep(time) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, time)
    })
  },

  async getTempFileURL(fileid) {
    // console.log('getTempFileURL', fileid)
    // 如果不是fileid就直接返回。
    if (
      !fileid || 
      fileid.indexOf('blob:') === 0 || 
      fileid.indexOf('data:image/png;base64,') === 0 || 
      fileid.substring(0, 8) != "cloud://" &&
      fileid.substring(0, 8) != "qiniu://"
    ) {
      return fileid
    }
    try{
      let res = await uniCloud.getTempFileURL({
        fileList: [fileid]
      })
      return res.fileList[0].tempFileURL
    }catch(e){
      console.error('getTempFileURL error', e)
    }
  },
  openURL(href) {
  	// #ifdef APP-PLUS
  	plus.runtime.openURL(href);
    return
  	// #endif
    
  	// #ifdef H5
  	window.open(href)
    return
  	// #endif
    
    // 其他例如：鸿蒙或者小程序环境，直接复制链接
  	uni.setClipboardData({
  		data: href
  	});
  	uni.showModal({
  		content: '链接已复制到剪贴板，您可以粘贴到浏览器中打开',
  		showCancel: false
  	});
  },

	
}
