<!--
 * @Author: 王硕
 * @Date: 2025-10-15 14:04:12
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-27 13:16:38
 * @Description: 
-->
  <template>
    <CustomTabbar />
  </template>
<script setup>
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import checkUpdate from "@/uni_modules/uni-upgrade-center-app/utils/check-update";
import CustomTabbar from '@/components/custom-tabbar/index.vue'
onLaunch(() => {
  console.log("App Launch");
});
onShow(async () => {
  console.log("App Show");
  // #ifdef APP-PLUS
  try {
    await checkUpdate();
  } catch (error) {
    console.log("checkUpdate error:", error);
  }
  // #endif
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
@import '@zebra-ui/swiper/index.scss';
@import "@/uni.scss";
@import "@/shared/style/reset.scss";
@import "@/shared/style/common.scss";
@import "@/shared/style/iconfont.css";
@import "@/shared/style/iconfont-init.scss";
</style>
