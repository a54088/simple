<!--
 * @Author: 王硕
 * @Date: 2025-10-25 16:00:33
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-27 16:36:50
 * @Description: 
-->
<script setup>
import { inject } from "vue";
const vm = inject("homeVM");
</script>

<template>
  <view class="operation-bar">
    <view>
      <scroll-view scroll-x="true">
        <view class="scroll-X">
          <view
            v-for="item in vm.menuList"
            :key="item.icon"
            class="scroll-X-item"
          >
            <text class="iconfont" :class="item.icon"></text>
          </view>
        </view>
      </scroll-view>
    </view>

    <view>
      <button class="operation-bar-btn" @tap="vm.showToast">
        <text class="iconfont icon-jianpan iconfont__btn"></text>
        <text class="operation-bar-btn-text">按住说话</text>
        <text class="iconfont icon-jianpan-2 iconfont__btn"></text>
      </button>
    </view>
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
  margin-top: 32rpx;
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
