<!--
 * @Author: 王硕
 * @Date: 2025-10-25 16:00:33
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-25 17:22:36
 * @Description: 
-->
<script setup></script>

<template>
  <view class="operation-bar">
    <button class="operation-bar-btn">
      <text class="iconfont icon-jianpan iconfont__btn"></text>
      <text class="operation-bar-btn-text">按住说话</text>
      <text class="iconfont icon-jianpan-2 iconfont__btn"></text>
    </button>
  </view>
</template>

<style lang="scss" scoped>
.icon-jianpan {
  left: 30rpx;
}
.icon-jianpan-2 {
  right: 30rpx;
}
.iconfont__btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.operation-bar-btn {
  height: 96rpx;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid !important;
  border-image: radial-gradient(
      108% 108% at 50% 50%,
      #3d3d3d 0%,
      rgba(255, 255, 255, 0) 100%
    )
    1;

  backdrop-filter: blur(10px);
  border-radius: 174rpx;
  color: unset;
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    border-radius: 174rpx;
    background: #181818;
  }
  .operation-bar-btn-text {
    font-size: 32rpx;
    font-weight: 500;
    letter-spacing: 0em;
    color: #ffffff;
    position: relative;
  }
}
.operation-bar {
  color: #fff;
  .scroll-X {
    display: flex;
  }
  .scroll-X-item {
    background: #181818;
    width: fit-content;
    padding: 16rpx 54rpx;
    border: 1px solid;
    border-image: radial-gradient(
        60% 60% at 50% 50%,
        #3d3d3d 0%,
        rgba(255, 255, 255, 0) 100%
      )
      1 !important;
    border-radius: 174rpx;
    backdrop-filter: blur(10px);
    margin-right: 30rpx;
    &:last-of-child {
      margin-right: 0;
    }
  }
}
</style>
