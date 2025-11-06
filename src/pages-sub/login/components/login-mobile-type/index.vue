<!--
 * @Author: 王硕
 * @Date: 2025-07-26 13:25:29
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-28 16:12:50
 * @Description: 登录类型选择页面 - 底部固定组件
-->
<script setup>

import { inject } from 'vue';

const vm = inject("loginVM");

</script>

<template>
  <view class="login-type-container">
    <!-- 登录类型选择内容 -->
    <view class="login-type-content">
      <!-- 这里可以添加登录类型选择的具体内容 -->
      <view class="login-type-text" v-if="vm.formType === 'sms_login'">
        <text @tap="vm.formType = 'password_login'">-密码登录-</text>
      </view>
      <view class="login-type-text" v-if="vm.formType === 'password_login'">
        <text @tap="vm.formType = 'sms_login'">-验证码登录-</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.login-type-container {
  // position: fixed;
  // bottom: 0;
  // left: 0;
  // right: 0;
  height: 150rpx;
  background-color: #fff;
  // border-top: 1rpx solid #e8e8e8;
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  // z-index: 999;
  padding-bottom: env(
    safe-area-inset-bottom
  ); // 适配iPhone等带有底部安全区域的设备
  box-sizing: border-box;
}

.login-type-content {
  // width: 100%;
  // height: 100%;
  // display: flex;
  // align-items: center;
  // justify-content: center;
}
.login-type-text {
  font-family: PingFang SC;
  font-size: 24rpx;
  color: #3d3d3d;
  margin-bottom: 16rpx;
  text-align: center;
}
.login-type-icon {
  color: #3d3d3d;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20rpx;
  .iconfont__btn{
    border-radius: 50%;
    padding: 13rpx;
    border: 1rpx solid #3d3d3d;
    margin: 0 25rpx; // 左右各25rpx，总共50rpx间隙
  }
}
</style>
