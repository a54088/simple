<!--
 * @Author: 王硕
 * @Date: 2025-10-28 16:10:00
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-28 16:10:00
 * @Description: 苹果登录按钮组件
-->
<script setup>
import { inject, onMounted, ref } from "vue";

const vm = inject("loginVM");
const showAppleLogin = ref(false);

// 检查是否支持苹果登录
onMounted(() => {
  // 仅在iOS平台显示苹果登录按钮
  // #ifdef APP-PLUS
  const platform = uni.getSystemInfoSync().platform;
  showAppleLogin.value = platform === 'ios';
  // #endif
});

// 处理苹果登录点击事件
const handleAppleLogin = () => {
  vm.appleLogin();
};
</script>

<template>
  <!-- #ifdef APP-PLUS -->
  <view v-if="showAppleLogin" class="apple-login-wrapper">
    <view class="apple-login-separator">
      <text>或</text>
    </view>
    <button class="apple-login-button" open-type="getUserInfo" @tap="handleAppleLogin">
      <text class="apple-login-icon"></text>
      <text class="apple-login-text">使用 Apple 登录</text>
    </button>
  </view>
  <!-- #endif -->
</template>

<style lang="scss" scoped>
.apple-login-wrapper {
  width: 100%;
  margin-top: 60rpx;
}

.apple-login-separator {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40rpx;
  text {
    font-size: 24rpx;
    color: rgba(255, 255, 255, 0.4);
    position: relative;
    padding: 0 20rpx;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      width: 100rpx;
      height: 1rpx;
      background-color: rgba(255, 255, 255, 0.2);
    }

    &::before {
      left: 0;
      transform: translateX(-120rpx) translateY(-50%);
    }

    &::after {
      right: 0;
      transform: translateX(120rpx) translateY(-50%);
    }
  }
}

.apple-login-button {
  width: 100%;
  height: 88rpx;
  background-color: transparent;
  border: 1rpx solid rgba(255, 255, 255, 0.3);
  border-radius: 44rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 28rpx;
  padding: 0;
  margin: 0;
  line-height: 88rpx;

  &:active {
    background-color: rgba(255, 255, 255, 0.1);
  }
}

.apple-login-icon {
  font-size: 40rpx;
  margin-right: 12rpx;
}

.apple-login-text {
  font-size: 28rpx;
}
</style>