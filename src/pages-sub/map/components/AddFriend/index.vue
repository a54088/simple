<template>
  <!-- 弹框容器：通过 visible 控制显示 -->
  <cover-view v-if="visible" class="map-popup">
    <!-- 遮罩层（可选，点击关闭弹框） -->
    <cover-view class="popup-mask" @click="handleClose"></cover-view>
    <!-- 弹框顶部操作内容 -->

    <!-- <u-icon name="search"></u-icon> -->

    <!-- 弹框主体 -->
    <cover-view class="popup-content">
      <!-- 头部信息 -->
      <cover-view class="popup-header">
        <cover-view>
          <cover-view class="popup-header-icons">
            <cover-view class="popup-header-icons-item"> <cover-image src="/static/map/icon-down.png" mode="widthFix" class="icon"></cover-image></cover-view>
            <cover-view class="popup-header-icons-item"> <cover-image src="/static/map/icon-search.png" mode="widthFix" class="icon"></cover-image></cover-view>
          </cover-view>
          <cover-view>
            <cover-view class="title">{{ title }}</cover-view>
            <cover-view class="desc">{{ desc }}</cover-view>
          </cover-view>

        </cover-view>
        <cover-image src="/static/map/addFriendsImg.png" mode="widthFix" class="add-friends-img"></cover-image>
      </cover-view>
      <!-- 添加好友 -->
      <cover-view class="add">
        <cover-image src="/static/map/userCommunication.png" mode="widthFix" class="avatar-imgs"></cover-image>
        <!-- 操作按钮 -->
        <cover-view class="action-btn" @click="handleAction">
           添加好友
        </cover-view>
      </cover-view>



      <!-- 关闭按钮 -->
      <!-- <cover-view class="close-btn" @click="handleClose">
        <text class="close-icon">×</text>
      </cover-view> -->
    </cover-view>

  </cover-view>
</template>

<script setup>
import { defineProps } from 'vue';

// 定义组件属性
const props = defineProps({
  // 是否显示弹框
  visible: {
    type: Boolean,
    default: false
  },
  // 标题文本
  title: {
    type: String,
    default: '用户名称'
  },
  // 描述文本
  desc: {
    type: String,
    default: '已持续和28位用户交流'
  },
  // 头像列表（最多显示5个）
  avatars: {
    type: Array,
    default: () => []
  },
});

// import { computed } from 'vue';
// // 定义每个头像的位置、尺寸配置（可根据设计调整）
// const avatarConfigs = [
//   { top: '50rpx', left: `calc(50% - 64rpx)`, width: '128rpx', height: '128rpx' },
//   { top: '100rpx', left: `calc(50% - 200rpx)`, width: '94rpx', height: '94rpx' },
//   { top: '20rpx', left: `calc(50% - 140rpx)`, width: '70rpx', height: '70rpx' },
//   { top: '0rpx', left: '360rpx', width: '102rpx', height: '102rpx' },
//   { top: '50rpx', left: '450rpx', width: '95rpx', height: '95rpx' },
//   // 若有更多头像，继续添加配置...
// ];

// // 计算每个头像的 top、left、width、height
// const getAvatarTop = (index) => avatarConfigs[index]?.top || '0rpx';
// const getAvatarLeft = (index) => avatarConfigs[index]?.left || '0rpx';
// const getAvatarWidth = (index) => avatarConfigs[index]?.width || '80rpx';
// const getAvatarHeight = (index) => avatarConfigs[index]?.height || '80rpx';

</script>

<style lang="scss" scoped>
.map-popup {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  box-sizing: border-box;
}

/* 遮罩层 */
.popup-mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}

/* 弹框内容 */
.popup-content {

  position: relative;
  width: 100%;
  background-color: #1a1a1a;
  border-radius: 20rpx 20rpx 0rpx 0rpx;
  padding: 40rpx 32rpx;
  box-shadow: 0 10rpx 40rpx rgba(0, 0, 0, 0.5);

  /* 头部信息 */
  .popup-header {
    margin-bottom: 30rpx;
    display: flex;
    justify-content: space-between;

    &-icons {
      display: flex;
      margin-bottom: 40rpx;

      &-item {
        width: 72rpx;
        height: 72rpx;
        border-radius: 105rpx;
        background: #1F1F1F;
        box-sizing: border-box;
        border: 1px solid #3D3D3D;
        backdrop-filter: blur(10rpx);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24rpx;
        margin-right: 30rpx;
        .icon{
          width: 32rpx;
          height: 32rpx;
        }
      }
    }


    .title {
      font-size: 50rpx;
      font-weight: 600;
      color: #ffffff;
      display: block;
      -webkit-text-fill-color: #ffffff; /* 针对 WebKit 内核的颜色强制（title 用） */
    }

    .desc {
      font-size: 32rpx;
      color: #DCDCDC;
      display: block;
      margin-top: 10rpx;
      -webkit-text-fill-color: #DCDCDC; /* desc 用 */

    }

    .add-friends-img {
      width: 225rpx;
      height: 248rpx;
    }
  }


  /* 头像列表 */
  .add {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20rpx;
    margin-bottom: 40rpx;
    border-radius: 20rpx;
    overflow: hidden;
    border: 2rpx solid #3D3D3D;
    padding: 28rpx 10rpx 32rpx;


    .avatar-imgs {
      width: 380rpx;
      height: 200rpx; // 根据头像布局高度调整
      margin-bottom: 34rpx;
    }

    /* 操作按钮 */
    .action-btn {
      width: 240rpx;
      height: 72rpx;
      text-align: center;
      border-radius: 168rpx;
      background: #39393B;
      color: #fff;
      -webkit-text-fill-color: #fff; 
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32rpx;
    }
  }




}


/* 关闭按钮 */
.close-btn {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  width: 50rpx;
  height: 50rpx;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.close-icon {
  color: #ffffff;
  font-size: 30rpx;
}
</style>