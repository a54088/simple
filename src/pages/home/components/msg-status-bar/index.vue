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
    <view @tap="handleMenuClick" class="menu-switch">
      <i class="iconfont icon-chouti"></i>
    </view>

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
        <AvatarStacking 
          v-if="!isOpen"  
          :avatarList="closeAvatarList" 
          :maxCount="4" 
          @tap="toggleOpen" 
        />
        <!-- 多个展开 -->
        <scroll-view 
          v-if="isOpen"
          class="scroll-view_H msg-avatar-group-open-wrapper avatar-open-show"
          :scroll-x="true" 
          @scroll="avatarScroll" 
        >
          <view class="msg-avatar-group-open">
            <u-avatar 
              v-for="(item, i) in avatarList" 
              @tap="handleAvatarClick(item)"
              :key="i" 
              :class="{ 'avatar-state-success': i === 1 }"
              :src="item"
              :size="31"
            ></u-avatar>
          </view>
        </scroll-view>

        <view @tap="toggleOpen" class="icon-xiala-box" :class="[isOpen && 'icon-rotated']">
          <i class="iconfont icon-xiala"></i>
        </view>
      </view>
    </view>
    <view @tap="handleLogoClick" class="msg-status-right img-box">
      <image src="/src/static/images/common/logo.png" mode="widthFix"></image>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { inject } from "vue";
// components
import AvatarStacking from '@/components/avatar-stacking/index.vue';

const vm = inject("homeVM");
const emit = defineEmits(['menuClick', 'logoClick', 'avatarClick']);

const avatarList = ref([
  "https://p26-passport.byteacctimg.com/img/user-avatar/60225805f9c3509ee8cb69a96d65e2a9~40x40.awebp",
  "https://p6-passport.byteacctimg.com/img/user-avatar/83bb13b5b69787c29207cb34aa8515f8~100x100.awebp",
  "https://p3-passport.byteacctimg.com/img/user-avatar/61c428663c65d1d95ff0203016721223~100x100.awebp",
  "https://p26-passport.byteacctimg.com/img/user-avatar/457c4c8401d2aa48711f76f88364faa2~100x100.awebp",
  "https://p26-passport.byteacctimg.com/img/user-avatar/60225805f9c3509ee8cb69a96d65e2a9~40x40.awebp",
  "https://p6-passport.byteacctimg.com/img/user-avatar/83bb13b5b69787c29207cb34aa8515f8~100x100.awebp",
  "https://p3-passport.byteacctimg.com/img/user-avatar/61c428663c65d1d95ff0203016721223~100x100.awebp",
  "https://p26-passport.byteacctimg.com/img/user-avatar/457c4c8401d2aa48711f76f88364faa2~100x100.awebp",
])
const avatar = ref("https://p26-passport.byteacctimg.com/img/user-avatar/60225805f9c3509ee8cb69a96d65e2a9~40x40.awebp");
// 头像组开关
const isOpen = ref(false);

const closeAvatarList = computed(() => {
  return avatarList.value.slice(0, 4);
})
const toggleOpen = () => {
  console.log('toggleOpen',isOpen.value);
  isOpen.value = !isOpen.value;
};

const handleMenuClick = () => {
  vm.toggleMenuPopup()
}

const avatarScroll = (e) => {
  console.log(e);
}

const handleAvatarClick = (item) => {
  console.log(item);
}

const handleLogoClick = () => {
  uni.navigateTo({
    url: '/pages-sub/map/index',
  })
}
</script>

<style lang="scss" scoped>
.msg-status-bar {
  display: flex;
  align-content: center;
  justify-content: space-between;
  padding: 0 32rpx;

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

  .menu-switch {
    width: 96rpx;
    height: 96rpx;
    border-radius: 96rpx;
    background: rgba(0, 0, 0, 0.7);

    display: flex;
    align-items: center;
    justify-content: center;
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

      .icon-xiala-box {
        margin-left: 10rpx;
        width: 28rpx;
        height: 28rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: rotate(-90deg);
      }

      .iconfont {
        transition: transform 0.2s ease-in-out;
        cursor: pointer;
        color: rgba(255, 255, 255, 0.6);
      }
      .icon-rotated {
        transform: rotate(90deg);
      }

      .msg-avatar-group-close {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10rpx;
        position: relative;
        
        &.avatar-close-show {
          animation: avatarCloseIn 0.2s ease-in-out forwards;
        }
        
        .u-avatar {
          position: absolute;
        }
      }

      .scroll-view_H {
        height: 70rpx;
        
        &.avatar-open-show {
          animation: avatarOpenIn 0.2s ease-in-out forwards;
        }
      }
      .msg-avatar-group-open {
        display: flex;
        gap: 14rpx;
        max-width: 250rpx;

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

// 头像组切换动画 - 使用 CSS animation 替代 transition（兼容 app 环境）
@keyframes avatarCloseIn {
  from {
    opacity: 0;
    transform: translateX(-20rpx);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes avatarOpenIn {
  from {
    opacity: 0;
    transform: translateX(20rpx);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.icon-a-mengbanzu135 {
  color: #adadad;
}

:deep(.uni-scroll-view-content) {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
