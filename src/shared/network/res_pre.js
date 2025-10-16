/*
 * @Author: 王硕
 * @Date: 2025-06-27 14:49:55
 * @LastEditors: 王硕
 * @LastEditTime: 2025-07-24 13:12:03
 * @Description:
 */
const onFulfilled = async (response) => {
  try {
    return response;
  } catch (e) {
    return Promise.reject(e);
  }
};

const onRejected = (response) => {
  return response;
};

export default { onFulfilled, onRejected, async: true };
