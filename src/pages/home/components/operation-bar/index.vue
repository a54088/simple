<!--
 * @Author: 王硕
 * @Date: 2025-10-25 16:00:33
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-27 16:36:50
 * @Description: 
-->
<template>
  <view class="operation-bar">
    <view class="operation-bar-content animate__animated" :class="[!isShowMenu && 'animate__slideInDown']">
      <view class="top-btn-box">
        <view class="top-btn-box-title">分身空间</view>
        <view class="top-btn-box-icon">
          <i class="iconfont icon-shengyin"></i>
        </view>
      </view>

      <view class="input-box">
        <view class="icon-phone-box">
          <i class="iconfont icon-dianhua"></i>
        </view>
        <view class="operation-bar-btn">
          <text class="iconfont icon-jianpan-2 iconfont__btn"></text>
          <text class="operation-bar-btn-text">按住说话</text>
          <text 
            @tap="toggleOpen" 
            class="iconfont icon-quxiao"
            :class="[isShowMenu && 'icon-rotated']"
          ></text>
        </view>
      </view>
    </view>

    <view 
      v-if="isShowMenu" 
      class="menu-box animate__animated" 
      :class="[isShowMenu && 'animate__fadeInUp']"
    >
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
const isShowMenu = ref(false)

const toggleOpen = () => {
  isShowMenu.value = !isShowMenu.value;
}
</script>

<style lang="scss" scoped>
.operation-bar {
  padding: 0 32rpx;
  position: fixed;
  bottom: 32rpx;
  width: 100%;
}

.operation-bar-content {
  --animate-duration: .2s;
}

.icon-quxiao {
  transform: rotate(45deg);
  font-size: 60rpx;
  width: 60rpx;
  height: 60rpx;
  overflow: hidden;
  margin-right: -10rpx;
}
.icon-rotated {
  transform: rotate(0);
}

.top-btn-box {
  display: flex;
  align-items: center;
  gap: 20rpx;
  >view {
    padding: 20rpx 26rpx;
    border-radius: 100rpx;
    background: rgba(0, 0, 0, 0.8);
    height: 78rpx;
  }
  .top-btn-box-title {
    font-size: 28rpx;
    font-weight: 500;
  }
  .top-btn-box-icon {
    width: 160rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon-shengyin {
      font-size: 48rpx;
    }
  }
}

.input-box {
  display: flex;
  align-items: center;
  gap: 20rpx;
  margin-top: 20rpx;

  .icon-phone-box {
    width: 96rpx;
    height: 96rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.9);
    border-radius: 50%;
  }

  .icon-jianpan {
    font-size: 36rpx;
  }
  .icon-jianpan-2 {
    font-size: 48rpx;
  }
  .operation-bar-btn {
    flex: 1;
    height: 96rpx;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(0, 0, 0, 0.9);
    border-radius: 100rpx;
    color: #fff;
    padding: 24rpx 30rpx;

    .operation-bar-btn-text {
      font-size: 32rpx;
      font-weight: 500;
      letter-spacing: 0em;
      color: #ffffff;
      position: relative;
    }
  }
} 

.menu-box {
  display: flex;
  justify-content: space-between;
  gap: 18rpx;
  margin-top: 20rpx;
  opacity: 0;
  --animate-duration: .2s;

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
