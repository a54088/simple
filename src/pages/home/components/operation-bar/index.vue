<!--
 * @Author: 王硕
 * @Date: 2025-10-25 16:00:33
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-27 16:36:50
 * @Description: 
-->
<template>
  <view class="operation-bar">
    <view class="top-btn-box">

    </view>

    <view class="input-box">
      <button class="operation-bar-btn" @tap="vm.showToast">
        <text class="iconfont icon-jianpan iconfont__btn"></text>
        <text class="operation-bar-btn-text">按住说话</text>
        <text class="iconfont icon-jianpan-2 iconfont__btn"></text>
      </button>
    </view>

    <view class="menu-box">
      <view
        v-for="item in menuList"
        :key="item.key"
        class="menu-item"
      >
        <text class="iconfont" :class="item.icon"></text>
        <text class="menu-item-text">{{ item.title }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { inject } from "vue";
const vm = inject("homeVM");

const menuList = ref([
    {
      title: '相册',
      icon: "iconfont icon-xiangce",
      key: "album",
    },
    {
      title: '相机',
      icon: "iconfont icon-xiangji",
      key: "camera",
    },
    {
      title: '文件',
      icon: "iconfont icon-wenjian",
      key: "file",
    },
    {
      title: '数据导入',
      icon: "iconfont icon-shujudaoru",
      key: "dataExport",
    },
])
</script>

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

.operation-bar {
  padding: 0 32rpx;
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

.top-btn-box {

}

.input-box {

} 

.menu-box {
  display: flex;
  justify-content: space-between;
  gap: 18rpx;

  .menu-item {
    flex: 1;
    background: rgba(0, 0, 0, 0.9);
    padding: 23rpx 31rpx;
    border-radius: 30rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20rpx;

    .menu-item-text {
      color: #999999;
      font-size: 24rpx;
    }
  }
}
</style>
