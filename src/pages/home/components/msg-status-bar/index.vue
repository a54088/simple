<!--
 * @Author: 王硕
 * @Date: 2025-10-25 16:00:33
 * @LastEditors: 王硕
 * @LastEditTime: 2025-10-25 16:05:49
 * @Description: 
-->
<template>
  <view class="msg-status-bar">
    <!-- 菜单 -->
    <!-- <view class="menu-switch">
      <i class="iconfont icon-paizhao-jinru"></i>
    </view> -->

    <view class="msg-avatar-box">
      <view class="msg-left-avatar">
        <u-avatar :size="31" :src="avatar"></u-avatar>
      </view>
      <view class="line"></view>
      <view class="msg-left-content">
        <!-- 单个 -->
        <view v-if="false" class="msg-avatar-only">
          <u-avatar :size="31" :src="avatar"></u-avatar>
        </view>
        <!-- 多个-折叠 -->
        <transition name="avatar-fade" mode="out-in">
          <view v-if="isOpen" key="close" class="msg-avatar-group-close">
            <u-avatar :size="31" :src="avatar"></u-avatar>
          </view>
          <!-- 多个展开 -->
          <view v-else key="open" class="msg-avatar-group-open">
            <u-avatar 
              v-for="i in 4" 
              :key="i" 
              :class="{ 'avatar-state-success': i === 1 }"
              :src="avatar"
              :size="31"
            ></u-avatar>
          </view>
        </transition>

        <view @click="toggleOpen">
          <i class="iconfont icon-a-mengbanzu135"></i>
        </view>
      </view>
    </view>
    <view class="msg-status-right img-box">
      <image src="/src/static/images/common/logo.png" mode="widthFix"></image>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const avatar = ref("https://p26-passport.byteacctimg.com/img/user-avatar/60225805f9c3509ee8cb69a96d65e2a9~40x40.awebp");
// 开关
const isOpen = ref(false);
const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style lang="scss" scoped>
.msg-status-bar {
  display: flex;
  align-content: center;
  justify-content: space-between;
  padding: 0 32rpx;
  gap: 68rpx;

  .img-box {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    overflow: hidden;
    
    image {
      width: 62rpx;
      height: 62rpx;
    }
  }

  .line {
    width: 6rpx;
    height: 42rpx;
    border-radius: 6rpx;
    background: rgba(255, 255, 255, 0.6);
    margin: 0 20rpx;
  }

  .msg-status-left {

  }

  .msg-avatar-box {
    max-width: calc(100% - 96rpx - 68rpx);
    height: 96rpx;
    border-radius: 96rpx;
    background: rgba(0, 0, 0, 0.7);
    padding: 12rpx 20rpx;
    display: flex;
    align-items: center;

    .msg-left-avatar {
      border: 2rpx solid #16C5FF;
      border-radius: 50%;
      padding: 5rpx;
      image {
        width: 62rpx;
        height: 62rpx;
      }
    }

    .msg-left-content {
      display: flex;
      align-items: center;
      transition: width 0.2s ease-in-out;

      .iconfont {
        margin-left: 20rpx;
        transition: transform 0.2s ease-in-out;
        cursor: pointer;
        
        &.icon-rotated {
          transform: rotate(180deg);
        }
      }

      .msg-avatar-group-close {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10rpx;
      }
      .msg-avatar-group-open {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10rpx;

        .avatar-state-success {
          position: relative;
          &::after {
            content: '';
            position: absolute;
            bottom: -2rpx;
            right: -2rpx;
            width: 10rpx;
            height: 10rpx;
            background: #73FF86;
            border: 2px solid #FFFFFF;
            border-radius: 50%;
          }
        }
      }
    }
  }

  .msg-status-right {
    width: 96rpx;
    height: 96rpx;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.7);
    text-align: center;
    image {
      width: 59rpx;
      height: 35rpx;
    }
  }
}

// 头像组切换动画
.avatar-fade-enter-active,
.avatar-fade-leave-active {
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
}

.avatar-fade-enter-from {
  opacity: 0;
  transform: translateX(-20rpx);
}

.avatar-fade-leave-to {
  opacity: 0;
  transform: translateX(20rpx);
}
</style>
