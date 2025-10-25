/*
 * @Author: 王硕
 * @Date: 2025-10-25 15:57:22
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-25 17:15:28
 * @Description:
 */
import { ViewModel } from "@/shared/class/view-model.js";

export class HomeVM extends ViewModel {
  menuList = [
    {
      icon: "iconfont icon-shengyin",
      key: "yuyin",
    },
    {
      icon: "iconfont icon-jurassic_wait",
      key: "shijian",
    },
    {
      icon: "iconfont icon-faqiliaotian",
      key: "shijian",
    },
    {
      icon: "iconfont icon-xinjian",
      key: "shijian",
    },
  ];
}
