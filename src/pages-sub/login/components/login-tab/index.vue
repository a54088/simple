<!--
 * @Author: 王硕
 * @Date: 2025-07-26 15:39:17
 * @LastEditors: 王硕
 * @LastEditTime: 2025-07-26 16:01:22
 * @Description: 
-->
<script setup>
import { inject } from "vue";

const vm = inject("loginVM");
</script>

<template>
  <view class="login-tab__layout">
    <view
      :class="[
        'login-tab__item',
        vm.tabIndex === index ? 'login-tab__item--active' : '',
      ]"
      :style="{
        backgroundImage: `url(${item.backgroundImage})`,
      }"
      v-for="(item, index) in vm.tabList"
      @tap="vm.tabIndex = index"
    >
      <text>{{ item.label }}</text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.login-tab__layout {
  width: 100%;
  display: flex;
  .login-tab__item--active {
    opacity: 1 !important;
  }
  .login-tab__item {
    width: 318rpx;
    height: 88rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: contain;
    background-repeat: no-repeat;
    box-sizing: border-box;
    font-size: 32rpx;
    font-weight: 500;
    color: #ffffff;
    letter-spacing: 0;
    opacity: 0.7;
  }
}
</style>
