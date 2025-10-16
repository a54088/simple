/*
 * @Author: 王硕
 * @Date: 2025-05-08 11:26:31
 * @LastEditors: 王硕
 * @LastEditTime: 2025-08-08 14:04:02
 * @Description:
 */
class UniStoreWrapper {
  key = "";

  constructor(key = "") {
    this.key = `aq--${key}`;
  }

  set(val) {
    if (val === undefined) return this.remove();

    if (uni) uni.setStorageSync(this.key, val);
    return val;
  }

  get() {
    try {
      const val = uni.getStorageSync(this.key);
      if (val) return val;
      return val;
    } catch (e) {
      console.error(`UniStoreWrapper:${e.message}`);
      return null;
    }
  }

  remove() {
    if (uni) uni.removeStorageSync(this.key);
  }
}

// start 中间件需要的持久化数据
const accessToken = new UniStoreWrapper("access_token");
const refreshToken = new UniStoreWrapper("refresh_token");
const userInfo = new UniStoreWrapper("userInfo");
const userId = new UniStoreWrapper("userId");
const guide = new UniStoreWrapper("guide");
// end

const appEnv = new UniStoreWrapper("appEnv");
const appType = new UniStoreWrapper("appType");

function clear() {
  accessToken.remove();
  refreshToken.remove();
  userId.remove();
  userInfo.remove();
}

export {
  userInfo,
  accessToken,
  refreshToken,
  userId,
  appEnv,
  appType,
  guide,
  clear,
};
