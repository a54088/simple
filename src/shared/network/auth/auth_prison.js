let prison = new Set();

const reset = () => {};
const isClosed = () => {
  return prison.size === 0;
};
const openPrison = () => {
  if (isClosed()) {
    prison.add(() => {});
  }
};
const closePrison = () => {
  prison.clear();
};

/**
 * @desc 新增换一个promise
 * @param rsv
 */
const add = (rsv) => {
  if (prison) {
    prison.add(rsv);
  } else {
    prison = new Set();
    prison.add(rsv);
  }
};
const resolveAll = () => {};
const rejectAll = () => {};
/**
 * @desc 是否关闭
 * @returns {boolean}
 */

/**
 * @desc 囚牢里一个接口鉴权成功，就可以全部越狱
 */
const brokeBy = (authData) => {
  prison.forEach((rsv) => {
    rsv(authData);
  });
  // 清空promise 的set
  prison.clear();
};

export default {
  reset,
  add,
  rejectAll,
  resolveAll,
  isClosed,
  brokeBy,
  openPrison,
  closePrison,
};
