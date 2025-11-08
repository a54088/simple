<!--
 * @Author: 王硕
 * @Date: 2025-10-15 14:04:12
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-27 16:37:13
 * @Description: 
-->
<script setup>
import { provide, ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import MsgStatusBar from "@/pages/home/components/msg-status-bar/index.vue";
import OperationBar from "@/pages/home/components/operation-bar/index.vue";
import SceneModel from "./components/scene-model/index.vue";
import MenuPopup from "./menu-popup/index.vue";

import { HomeVM } from "@/pages/home/vm/index.js";

const vm = new HomeVM();
provide("homeVM", vm);

onLoad(() => {});

</script>

<template>
  <view class="home__layout">
    <u-status-bar></u-status-bar>
    <MsgStatusBar></MsgStatusBar>
    <SceneModel />
    <OperationBar></OperationBar>
    <MenuPopup></MenuPopup>
    <!-- <u-safe-bottom></u-safe-bottom> -->
  </view>
</template>

<style lang="scss" scoped>
.home__layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #D8D8D8;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #fff;
  padding: 32rpx 0;
}
</style>
