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
import ThreeScene from '@/components/three-scene/index.vue';

import { HomeVM } from "@/pages/home/vm/index.js";

const vm = new HomeVM();
provide("homeVM", vm);

onLoad(() => {});

const threeLoad = (model) => {
  console.log('模型加载完成', model.animations, model)
}

const progress = (num) => {
  console.log('模型进度', num)
}

const error = (err) => {
  console.log('模型加载失败', err)
}
</script>

<template>
  <view class="home__layout">
    <MsgStatusBar></MsgStatusBar>
    <ThreeScene 
      model="https://cos.shanghejingan.com/20251106/meinv_1762411171317.glb"
      @load="threeLoad"
      @progress="progress"
      @error="error"
    />
    <OperationBar></OperationBar>
  </view>
</template>

<style lang="scss" scoped>
.home__layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #121212;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #fff;
  padding: 32rpx;
}
</style>
