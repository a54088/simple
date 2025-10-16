/*
 * @Author: 王硕
 * @Date: 2025-06-27 14:49:55
 * @LastEditors: 王硕
 * @LastEditTime: 2025-07-24 13:11:33
 * @Description:
 */
const onFulfilled = async (response) => {
  try {
    return response;
  } catch (e) {
    return Promise.reject(e);
  }
};

export default { onFulfilled, async: true };
