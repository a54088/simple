/*
 * @Author: 王硕
 * @Date: 2025-10-25 15:57:22
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-27 16:40:30
 * @Description:
 */
import { ViewModel } from "@/shared/class/view-model.js";

export class HomeVM extends ViewModel {

  showToast() {
    try {
      uni.$u.showModal({
        title: "全局弹窗",
        content: "全局弹窗内容",
        success: (res) => {
          console.log(res);
        },
        fail: (err) => {
          console.log(err);
        },
      });
    } catch (e) {
      console.log("弹窗异常", e);
    }
  }
}
