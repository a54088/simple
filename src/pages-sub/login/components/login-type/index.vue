<!--
 * @Author: 王硕
 * @Date: 2025-07-26 13:25:29
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-28 16:12:50
 * @Description: 登录类型选择页面 - 底部固定组件
-->
<script setup>

import { inject, ref, onMounted } from 'vue';
import { isChineseLocale } from '@/utils/index';

const vm = inject("loginVM");

// 判断是否为国内用户的状态
const isChineseUser = ref(true); // 默认假设为国内用户

// 初始化时获取用户地区信息
onMounted(() => {
  try {
    // 使用工具函数判断当前是否为国内语言环境
    isChineseUser.value = isChineseLocale();
  } catch (e) {
    console.log('获取语言设置失败', e);
    // 默认保持为国内用户
  }
});
</script>

<template>
  <view class="login-type-container">
    <!-- 登录类型选择内容 -->
    <view class="login-type-content">
      <!-- 这里可以添加登录类型选择的具体内容 -->
      <view class="login-type-text">
        <text>-其他登录方式-</text>
      </view>
      <view class="login-type-icon">
        <!-- 国内显示微信登录，国外显示谷歌登录 -->
        <text v-if="isChineseUser" class="iconfont icon-denglu_weixin iconfont__btn"></text>
        <text v-else class="iconfont icon-denglu_guge iconfont__btn"></text>
        <!-- 始终显示苹果登录 -->
        <text class="iconfont icon-denglu_pingguo iconfont__btn"></text>
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
  // display: flex;
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
