<!--
 * @Author: 王硕
 * @Date: 2025-10-15 14:04:12
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-25 16:56:50
 * @Description: 
-->
<script setup>
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
@import "@/uni.scss";
@import "@/shared/style/reset.scss";
@import "@/shared/style/common.scss";
@import "@/shared/style/iconfont.css";
@import "@/shared/style/iconfont-init.scss";
</style>
